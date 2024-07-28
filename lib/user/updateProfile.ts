"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { actionClient } from "./safe-action";
import { profileFormSchema } from "@/validators/formSchema";
import { revalidatePath } from "next/cache";

export const updateProfile = actionClient
  .schema(profileFormSchema)
  .action(async ({ parsedInput: data }) => {
    const { isAuthenticated, getUser } = getKindeServerSession();

    const [isUserAuthenticated, user] = await Promise.all([
      isAuthenticated,
      getUser(),
    ]);

    if (!isUserAuthenticated) {
      redirect("/api/auth/login?");
    }

    try {
      const updatedProfile = await prisma.user.update({
        where: { kindeId: user?.id },
        data: {
          firstName: data.firstName ?? user?.given_name ?? "",
          lastName: data.lastName ?? user?.family_name ?? "",
          email: data.email || user?.email || "",
          phoneNumber: data.phoneNumber ?? "",
          address: data.address ?? "",
        },
      });

      if (updatedProfile) {
        revalidatePath("/profile",);
        return { success: "Profile successfully updated" };
      } else {
        return { error: "Failed to update profile" };
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      return { error: "Failed to update profile" };
    }
  });
