"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/lib/db";

export async function saveUserDetails() {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.id) {
      return { error: "No user found" };
    }

    let existingUser = await prisma.user.findUnique({
      where: {
        email: user.email ?? "",
      },
    });

    if (existingUser) {
      return { error: "User with this email already exists" };
    }

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

    return { success: "User created" };
  } catch (error) {
    console.error("Error saving user details:", error);
    return { error: "Failed to save user details" };
  }
}
