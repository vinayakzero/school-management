import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    // If accessing admin and user is not an admin-level role, redirect
    if (pathname.startsWith("/admin") && token) {
      const adminRoles = ["super_admin", "admin", "accountant", "teacher"];
      if (!adminRoles.includes(token.role as string)) {
        return NextResponse.redirect(new URL("/login?error=unauthorized", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        // Public routes
        if (pathname.startsWith("/login") || pathname.startsWith("/api/auth")) {
          return true;
        }
        // Everything else requires a valid token
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
