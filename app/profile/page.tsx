import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import SignOutButton from "@/components/SignOutButton";
import ProfileUpdateForm from "@/components/ProfileUpdateForm";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // login না থাকলে signin-এ পাঠাও — protected route!
  if (!session) {
    redirect("/signin");
  }

  const user = session.user;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Title */}
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold text-gray-900">আমার প্রোফাইল</h1>
        <p className="text-sm text-gray-500">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </div>

      {/* User info card */}
      <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="w-20 h-20 rounded-full bg-[#eaf5ed] text-[#0d783d] text-3xl font-extrabold flex items-center justify-center">
            {user.name?.charAt(0) ?? "ব"}
          </span>
          <div>
            <p className="text-2xl font-extrabold text-gray-900">{user.name}</p>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>
        <SignOutButton className="border border-red-500 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-semibold transition-colors" />
      </section>

      {/* তথ্য / Update card */}
      <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-6">
        <h2 className="text-xl font-bold text-gray-900">তথ্য</h2>
        <ProfileUpdateForm currentName={user.name ?? ""} />
      </section>
    </div>
  );
}
