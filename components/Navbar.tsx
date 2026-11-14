import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import SignOutButton from "@/components/SignOutButton";
import UserMenu from "@/components/UserMenu";
import BanglaDate from "@/components/BanglaDate";

type Category = {
  id: string;
  nameBn: string;
  icon: string;
};

async function getCategories() {
    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/categories", {
  cache: "force-cache"
});
    const categories: Category[] = await res.json();
    return categories;
}

// <marquee> পুরনো HTML tag — TypeScript-এর JSX টাইপে নেই, তাই alias
const Marquee = "marquee" as unknown as React.ElementType;

export default async function Navbar() {
  const categories = await getCategories();

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Row 1: Logo + Auth */}
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-700 flex items-center justify-center text-white text-lg shadow-sm">
            🛒
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-bold text-gray-900 tracking-tight">বাজার দর</span>
            <span className="text-xs text-gray-500"><BanglaDate /></span>
          </div>
        </Link>

        {session ? (
          <UserMenu name={session.user.name ?? ""} email={session.user.email ?? ""} />
        ) : (
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/signin"
              className="border border-[#0f8a44] text-[#0f8a44] hover:bg-[#eaf5ed] px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors"
            >
              সাইন ইন
            </Link>
            <Link
              href="/signup"
              className="bg-[#0f8a44] hover:bg-[#0b6e35] text-white px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors shadow-sm"
            >
              সাইন আপ
            </Link>
          </div>
        )}
      </div>

      {/* Row 2: Categories */}
      <div className="border-t border-gray-100/80">
        <nav className="max-w-6xl mx-auto px-4 py-2 flex flex-wrap gap-5 justify-start">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.id}`}
              className="text-xs sm:text-sm font-medium text-gray-600 hover:text-emerald-700 transition-colors flex items-center gap-1.5"
            >
              <span>{cat.icon}</span>
              <span>{cat.nameBn}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Row 3: Price Ticker */}
      <div className="bg-gray-50 border-y border-gray-200 text-gray-700 text-xs py-2 overflow-hidden">
        <Marquee className="flex items-center">
          <span className="inline-flex items-center gap-1.5 px-3">
            🍚 স্বর্ণমাছি চাল ৫৪ টাকা/কেজি <span className="text-red-500 font-bold">▲ ২.১%</span>
          </span>
          <span className="text-gray-300">|</span>
          <span className="inline-flex items-center gap-1.5 px-3">
            🍚 মিনিকেট চাল ৯৯ টাকা/কেজি <span className="text-emerald-600 font-bold">▼ ২.৯%</span>
          </span>
          <span className="text-gray-300">|</span>
          <span className="inline-flex items-center gap-1.5 px-3">
            🧅 দেশি পেঁয়াজ ৪৫ টাকা/কেজি <span className="text-red-500 font-bold">▲ ১.৫%</span>
          </span>
          <span className="text-gray-300">|</span>
          <span className="inline-flex items-center gap-1.5 px-3">
            🥔 গোল আলু ৫৫ টাকা/কেজি <span className="text-emerald-600 font-bold">▼ ৩.১%</span>
          </span>
          <span className="text-gray-300">|</span>
          <span className="inline-flex items-center gap-1.5 px-3">
            🫚 সয়াবিন তেল ১৮০ টাকা/লিটার <span className="text-red-500 font-bold">▲ ০.৮%</span>
          </span>
          <span className="text-gray-300">|</span>
          <span className="inline-flex items-center gap-1.5 px-3">
            🐟 ইলিশ মাছ ১২০০ টাকা/কেজি <span className="text-emerald-600 font-bold">▼ ৩.২%</span>
          </span>
          <span className="text-gray-300">|</span>
          <span className="inline-flex items-center gap-1.5 px-3">
            🍗 ব্রয়লার মুরগি ১৭৫ টাকা/কেজি <span className="text-red-500 font-bold">▲ ১.২%</span>
          </span>
        </Marquee>
      </div>
    </header>
  );
}