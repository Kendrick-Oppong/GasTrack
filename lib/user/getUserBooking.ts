import { redirect } from "next/navigation";
import prisma from "../db";
import { getUserStatus } from "./getUserStatus";

export async function getUserBooking() {
  const { user, isUserAuthenticated } = await getUserStatus();

  if (!isUserAuthenticated) {
    redirect("/api/auth/login?");
  }

  try {
    const userWithBookings = await prisma.booking.findMany({
      where: {
        userId: user?.id,
        user: {
          role: "USER",
        },
      },
      include: {
        user: true,
      },
    });

    console.log(userWithBookings);
    return userWithBookings;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch bookings");
  }
}
