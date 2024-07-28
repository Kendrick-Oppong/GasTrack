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
  }
}

export async function getUserDetails() {
  const { user, isUserAuthenticated } = await getUserStatus();

  if (!isUserAuthenticated) {
    redirect("/api/auth/login?");
  }

  try {
    const userDetails = await prisma.user.findUnique({
      where: {
        kindeId: user?.id,
        role: "USER",
      },
    });

    if (!userDetails) {
      throw new Error("User not found");
    }

    return userDetails;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch user details");
  }
}
