"use client";

import { useState } from "react";
import Link from "next/link";
import SignOutButton from "@/components/SignOutButton";

type UserMenuProps = {
  name: string;
  email: string;
};

export default function UserMenu({ name, email }: UserMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative shrink-0">
      {/* Trigger — avatar + নাম + chevron */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 hover:opacity-80"
      >
        <span className="w-9 h-9 rounded-full bg-[#eaf5ed] text-[#0d783d] text-sm font-extrabold flex items-center justify-center">
          {name?.charAt(0) ?? "ব"}
        </span>
        <span className="text-sm font-semibold text-gray-900">{name}</span>
        <span
          className={`text-gray-400 text-xs transition-transform ${
            open ? "rotate-180" : ""
          }`}
        >
          ▾
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <>
          {/* বাইরে click করলে বন্ধ */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />

          <div className="absolute right-0 top-full mt-2 z-50 w-64 bg-white rounded-2xl border border-gray-100 shadow-lg p-4 space-y-3">
            <div>
              <p className="font-bold text-gray-900">{name}</p>
              <p className="text-xs text-gray-500">{email}</p>
            </div>

            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#0f8a44] transition-colors"
            >
              👤 আমার প্রোফাইল
            </Link>

            <SignOutButton className="flex items-center gap-2 text-sm font-medium text-red-600 hover:underline" />
          </div>
        </>
      )}
    </div>
  );
}
