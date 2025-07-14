import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const user = await currentUser();

  if (!user || user.emailAddresses[0].emailAddress !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
    return redirect('/');
  }

  return (
    <div className="bg-black mt-28 mx-auto px-4 text-white min-h-screen">
      <h1>Admin Only Page</h1>
 </div>
);
}