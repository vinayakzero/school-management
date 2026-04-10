import type { Metadata } from "next";
import { Suspense } from "react";
import LoginClient from "./LoginClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign In — School Management System",
  description: "Sign in to your school administration panel.",
};

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  const role = (session?.user as any)?.role;
  const adminRoles = ["super_admin", "admin", "accountant", "teacher"];

  if (session && adminRoles.includes(role)) {
    redirect("/admin");
  }

  return (
    <Suspense>
      <LoginClient />
    </Suspense>
  );
}
