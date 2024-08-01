import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
   const { getUser } = getKindeServerSession(req, res);
   const user = await getUser();

   if (user && user.id) {
     let newDBUser = await prisma.user.findUnique({
       where: {
         kindeId: user.id,
       },
     });

     if (!newDBUser) {
       newDBUser = await prisma.user.create({
         data: {
           email: user.email ?? "",
           firstName: user.given_name ?? "",
           lastName: user.family_name ?? "",
           profileImage:
             user.picture ?? `https://avatar.vercel.sh/${user.given_name}`,
           kindeId: user.id,
           phoneNumber: user.phone_number ?? "",
         },
       });
     }
     return NextResponse.json({ message: "User checked/created successfully" }, {status:200});
   } else {
     return NextResponse.json({ message: "No user found" }, {status:500});
   }
}
