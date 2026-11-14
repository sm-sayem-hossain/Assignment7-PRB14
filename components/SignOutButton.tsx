"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SignOutButton({ className }: { className?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSignOut() {
    setLoading(true);
    const { error } = await authClient.signOut();

    if (error) {
      toast.error("সাইন আউট ব্যর্থ হয়েছে");
    } else {
      toast.success("সাইন আউট সফল");
      router.push("/");
      router.refresh();
    }

    setLoading(false);
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={loading}
      className={className}
    >
      {loading ? "..." : "↩ সাইন আউট"}
    </button>
  );
}
