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

    if (userWithBookings.length === 0) {
      return [];
    }

  
    return userWithBookings;
  } catch (error) {
    console.log(error);
    //  if (error) throw new Error("Failed to get booking");
  }
}
