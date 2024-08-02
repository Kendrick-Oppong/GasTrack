"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { actionClient } from "../user/safe-action";

const deleteSchema = z.object({
  id: z.string(),
});

export const deleteCustomer = actionClient
  .schema(deleteSchema)
  .action(async ({ parsedInput: { id } }) => {
    const { isAuthenticated } = getKindeServerSession();

    const [isUserAuthenticated] = await Promise.all([isAuthenticated]);

    if (!isUserAuthenticated) {
      redirect("/api/auth/login?");
    }

    try {
      const customer = await prisma.user.findUnique({
        where: {
          id: id,
          role: "USER",
        },
      });

      if (!customer) {
        return { error: "User does not exist" };
      }

      await prisma.user.delete({
        where: {
          id: id,
        },
      });

      revalidatePath("/admin/customer");
      return { success: "User successfully deleted" };
    } catch (error) {
      console.error("Failed to delete customer:", error);
      return { error: "Failed to delete customer" };
    }
  });

export const deleteWorker = actionClient
  .schema(deleteSchema)
  .action(async ({ parsedInput: { id } }) => {
    const { isAuthenticated } = getKindeServerSession();

    const [isUserAuthenticated] = await Promise.all([isAuthenticated]);

    if (!isUserAuthenticated) {
      redirect("/api/auth/login?");
    }

    try {
      const worker = await prisma.worker.findUnique({
        where: {
          id: id,
        },
      });

      if (!worker) {
        return { error: "Worker does not exist" };
      }

      await prisma.worker.delete({
        where: {
          id: id,
        },
      });

      revalidatePath("/admin/riders");
      return { success: "Worker successfully deleted" };
    } catch (error) {
      console.error("Failed to delete worker:", error);
      return { error: "Failed to delete worker" };
    }
  });

export const deleteStation = actionClient
  .schema(deleteSchema)
  .action(async ({ parsedInput: { id } }) => {
    const { isAuthenticated } = getKindeServerSession();

    const [isUserAuthenticated] = await Promise.all([isAuthenticated]);

    if (!isUserAuthenticated) {
      redirect("/api/auth/login?");
    }

    try {
      const station = await prisma.station.findUnique({
        where: {
          id: id,
        },
      });

      if (!station) {
        return { error: "Station does not exist" };
      }

      await prisma.station.delete({
        where: {
          id: id,
        },
      });

      revalidatePath("/admin/stations");
      return { success: "Station successfully deleted" };
    } catch (error) {
      console.error("Failed to delete station:", error);
      return { error: "Failed to delete station" };
    }
  });
