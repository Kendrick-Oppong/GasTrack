"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../db";
import { revalidatePath } from "next/cache";
import { actionClient } from "./safe-action";
import { redirect } from "next/navigation";
import { z } from "zod";

const deleteSchema = z.object({
  bookingId: z.string(),
});

export const deleteBooking = actionClient
  .schema(deleteSchema)
  .action(async ({ parsedInput: { bookingId } }) => {
    const { isAuthenticated, getUser } = getKindeServerSession();

    const [isUserAuthenticated] = await Promise.all([
      isAuthenticated,
      getUser(),
    ]);

    if (!isUserAuthenticated) {
      redirect("/api/auth/login?");
    }

    try {
      const booking = await prisma.booking.findUnique({
        where: {
          id: bookingId,
        },
      });

      if (!booking) {
        return { error: "Booking does not exist" };
      }

      await prisma.booking.delete({
        where: {
          id: bookingId,
        },
      });

      revalidatePath("/track");
      return { success: "Booking successfully deleted" };
    } catch (error) {
      console.error("Failed to delete booking:", error);
      return { error: "Failed to delete booking" };
    }
  });
