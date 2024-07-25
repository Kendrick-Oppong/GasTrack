
"use server"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function getUserStatus() {
  const { isAuthenticated, getPermission, getUser } = getKindeServerSession();

  const [isUserAuthenticated, canViewAdmin, user] = await Promise.all([
    isAuthenticated(),
    getPermission("admin"),
    getUser(),
  ]);
 return { isUserAuthenticated, canViewAdmin , user};
}
