"use server"

import prisma from "../db";
import { revalidatePath } from "next/cache";

export async function deleteBooking(bookingId: string) {
  try {
    await prisma.booking.delete({
      where: {
        id: bookingId,
      },
    });
      revalidatePath("/book-now");
      return {succeess:"Booking successfully deleted"}
  } catch (error) {
    console.error("Failed to delete booking:", error);
    throw new Error("Failed to delete booking");
  }
}
