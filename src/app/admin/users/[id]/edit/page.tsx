import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import UserForm from "../../UserForm";
import { notFound } from "next/navigation";

export default async function EditUserPage({ params }: { params: { id: string } }) {
  await connectDB();
  const user = await User.findById(params.id).lean() as any;
  if (!user) notFound();

  return (
    <UserForm
      mode="edit"
      user={{
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      }}
    />
  );
}
