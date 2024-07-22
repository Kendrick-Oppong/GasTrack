import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
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
  return NextResponse.redirect(process.env.KINDE_SITE_URL as string);
}
