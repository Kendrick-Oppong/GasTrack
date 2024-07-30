"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../db";
import { revalidatePath } from "next/cache";
import { actionClient } from "./safe-action";
import { redirect } from "next/navigation";
import { z } from "zod";

const deleteSchema = z.object({
  id: z.string(),
});

export const deleteBooking = actionClient
  .schema(deleteSchema)
  .action(async ({ parsedInput: { id } }) => {
    const { isAuthenticated } = getKindeServerSession();

    const [isUserAuthenticated] = await Promise.all([isAuthenticated]);

    if (!isUserAuthenticated) {
      redirect("/api/auth/login?");
    }

    try {
      const booking = await prisma.booking.findUnique({
        where: {
          id: id,
        },
      });

      if (!booking) {
        return { error: "Booking does not exist" };
      }

      await prisma.booking.delete({
        where: {
          id: id,
        },
      });

      revalidatePath("/track");
      return { success: "Booking successfully deleted" };
    } catch (error) {
      console.error("Failed to delete booking:", error);
      return { error: "Failed to delete booking" };
    }
  });
