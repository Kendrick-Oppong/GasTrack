"use server";
import { redirect } from "next/navigation";
import prisma from "../db";
import { getUserStatus } from "../user/getUserStatus";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { actionClient } from "../user/safe-action";

 const updateBookingStatusSchema = z.object({
  bookingId: z.string(),
  newStatus: z.enum(["PENDING", "CONFIRMED", "DELIVERED", "CANCELLED"]),
});

export const updateBookingStatus = actionClient
  .schema(updateBookingStatusSchema)
  .action(async ({ parsedInput: { bookingId, newStatus } }) => {
    const { isUserAuthenticated } = await getUserStatus();

    if (!isUserAuthenticated) {
      redirect("/api/auth/login?");
    }

    try {
      // Check if the booking exists and belongs to the authenticated user
      const booking = await prisma.booking.findUnique({
        where: {
          id: bookingId,
        },
      });

      if (!booking) {
        throw new Error("Booking not found");
      }

      // Update the booking status
      await prisma.booking.update({
        where: {
          id: bookingId,
        },
        data: {
          status: newStatus,
        },
      });
      revalidatePath("/admin/booking");
      return { success: "Status successfully updated" };
    } catch (error) {
      console.error("Failed to update booking status:", error);
      return { error: "Failed to update booking status" };
    }
  });
