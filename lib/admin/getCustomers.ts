"use server";

import prisma from "../db";

export const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      where: {
        role: "USER",
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phoneNumber: true,
        address: true,
        profileImage: true,
      },
    });
    if (users.length === 0) {
      return [];
    }

    return users;
  } catch (error) {
    console.error("Failed to fetch users:", error);
  }
};
