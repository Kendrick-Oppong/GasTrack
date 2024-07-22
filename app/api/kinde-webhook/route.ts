import { NextResponse } from "next/server";
import jwksClient from "jwks-rsa";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/lib/db";

const issuer = process.env.KINDE_ISSUER_URL;

export async function POST(req: Request) {
  try {
    const client = jwksClient({
      jwksUri: `${issuer}/.well-known/jwks.json`,
    });
    // Get the token from the request
    const token = await req.text();
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || user === null || !user?.id) {
      throw new Error("Oops Something went wrong");
    }

    let newDBUser = await prisma.user.findUnique({
      where: {
        kindeId: user?.id,
      },
    });

    // Decode the token
    const decodedToken = jwt.decode(token, { complete: true });

    if (!decodedToken || typeof decodedToken === "string") {
      throw new Error("Invalid token");
    }

    const { header } = decodedToken;
    const { kid } = header;

    // Verify the token
    const key = await client.getSigningKey(kid);
    const signingKey = key.getPublicKey();
    const event = jwt.verify(token, signingKey) as JwtPayload;

    if (typeof event !== "object" || !event.type) {
      throw new Error("Invalid event data");
    }

    // Handle various events
    switch (event.type) {
      case "user.updated":
        if (newDBUser) {
          await prisma.user.update({
            where: {
              kindeId: user.id,
            },
            data: {
              email: event.email ?? newDBUser.email,
              firstName: event.given_name ?? newDBUser.firstName,
              lastName: event.family_name ?? newDBUser.lastName,
              profileImage: event.picture ?? newDBUser.profileImage,
              phoneNumber: event.phone_number ?? newDBUser.phoneNumber,
            },
          });
        }
        console.log(event);
        break;
      case "user.created":
        if (!newDBUser) {
          newDBUser = await prisma.user.create({
            data: {
              email: user?.email ?? "",
              firstName: user?.given_name ?? "",
              lastName: user?.family_name ?? "",
              profileImage:
                user.picture ?? `https://avatar.vercel.sh/${user?.given_name}`,
              kindeId: user.id ?? "",
              phoneNumber: user?.phone_number ?? "",
            },
          });
        }
        console.log(event);
        break;
      case "user.deleted":
        if (newDBUser) {
          await prisma.user.delete({
            where: {
              kindeId: user.id,
            },
          });
        }
        console.log(event);
        break;
      default:
        // other events that we don't handle
        break;
    }

    return NextResponse.json({
      status: 200,
      statusText: "Event processed successfully",
    });
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      return NextResponse.json({ message: err.message }, { status: 400 });
    }
  }
}
