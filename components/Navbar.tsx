import Link from "next/link";

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

export default async function Navbar() {
  const categories = await getCategories();

  const today = new Date();
  const banglaDate = today.toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
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
            <span className="text-xs text-gray-500">{banglaDate}</span>
          </div>
        </Link>

        <div className="flex gap-2 shrink-0">
          <Link href="/signin" className="btn btn-sm btn-outline btn-success">সাইন ইন</Link>
          <Link href="/signup" className="btn btn-sm btn-success text-white">সাইন আপ</Link>
        </div>
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
        <marquee className="flex items-center">
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
        </marquee>
      </div>
    </header>
  );
}