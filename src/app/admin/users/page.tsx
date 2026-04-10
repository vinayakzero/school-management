import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import UsersClient from "./UsersClient";

export const dynamic = "force-dynamic";

export default async function UsersPage() {
  await connectDB();
  const users = await User.find().sort({ createdAt: -1 }).lean();
  const serialized = users.map((u: any) => ({
    _id: u._id.toString(),
    name: u.name,
    email: u.email,
    role: u.role,
    status: u.status,
    lastLogin: u.lastLogin ? u.lastLogin.toISOString() : null,
    createdAt: u.createdAt?.toISOString(),
  }));

  return <UsersClient users={serialized} />;
}
