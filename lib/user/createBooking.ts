"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { actionClient } from "./safe-action";
import { bookingFormServerSchema } from "@/validators/formSchema";
import { revalidatePath } from "next/cache";

export const createBooking = actionClient
  .schema(bookingFormServerSchema)
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
      await prisma.booking.create({
        data: {
          fullName: data.fullName ?? `${user?.given_name} ${user?.family_name}`,
          email: data.email ?? user?.email,
          phoneNumber: data.phoneNumber,
          address: data.address,
          cylinderSize: data.cylinderSize,
          deliveryDate: new Date("2024-07-25"),
          deliveryTime: "14:20",
          latitude: (data?.latitude as number) || 0,
          longitude: (data.longitude as number) || 0,
          userId: user?.id as string,
        },
      });
      revalidatePath("/book-now");
      return { success: "Booking successfuly created" };
    } catch (error) {
      console.error(error);
      return { error: "Failed to create booking" };
    }
  });
