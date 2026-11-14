"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function ProfileUpdateForm({
  currentName,
}: {
  currentName: string;
}) {
  const router = useRouter();
  const [name, setName] = useState(currentName);
  const [loading, setLoading] = useState(false);

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();

    if (name.trim().length < 2) {
      toast.error("নাম কমপক্ষে ২ অক্ষরের হতে হবে");
      return;
    }

    setLoading(true);
    const { error } = await authClient.updateUser({ name });

    if (error) {
      toast.error(error.message ?? "আপডেট ব্যর্থ হয়েছে");
    } else {
      toast.success("তথ্য আপডেট সফল!");
      router.refresh();
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleUpdate} className="space-y-4">
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">নাম</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#0f8a44] hover:bg-[#0b6e35] disabled:opacity-60 text-white py-2.5 rounded-lg text-sm font-semibold transition-colors"
      >
        {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
      </button>
    </form>
  );
}
