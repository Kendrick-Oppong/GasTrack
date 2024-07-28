import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
export default withAuth({
  isReturnToCurrentPage: true,
  loginPage: "/api/auth/login",
});

export const config = {
  matcher: ["/track", "/book-now", "/profile"],
};
