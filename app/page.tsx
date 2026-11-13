import ProductCard, { type Product } from "@/components/ProductCard";
import { toBn } from "@/lib/format";
const API = "https://openapi.programming-hero.com/api/bazardor";

export default async function Home() {
  const res = await fetch(`${API}/products`);
  const products: Product[] = await res.json();

  const risers = products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  const today = new Date();
  const banglaDate = today.toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
      {/* 🅱️ Hero / Banner Section */}
      <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left Content */}
        <div className="flex-1 space-y-4">
          {/* Eyebrow badge */}
          <span className="inline-block px-3.5 py-1 rounded-full text-xs sm:text-sm font-medium bg-[#eaf5ed] text-[#0d783d]">
            {banglaDate}
          </span>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-snug">
            আজকের বাজারের দাম এক নজরে
          </h1>

          {/* Subtitle */}
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-xl">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          {/* CTA Button */}
          <div className="pt-2">
            <a
              href="#সব-পণ্য"
              className="inline-block bg-[#0f8a44] hover:bg-[#0b6e35] text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-sm"
            >
              সব পণ্য দেখুন
            </a>
          </div>
        </div>

        {/* Right Illustration: Basket of Fresh Vegetables/Fruits */}
        <div className="flex-shrink-0 flex items-center justify-center">
          <svg
            className="w-48 h-48 sm:w-60 sm:h-60"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Ground shadow */}
            <ellipse cx="100" cy="180" rx="70" ry="10" fill="#e2e8f0" />

            {/* Fruits behind basket */}
            {/* Green Big Fruit (Watermelon) */}
            <circle cx="120" cy="95" r="32" fill="#10b981" />
            <circle cx="112" cy="85" r="8" fill="#34d399" />
            {/* Green Stem/Leaves */}
            <path
              d="M120 64 C116 52 110 50 106 52 M120 64 C124 52 130 50 134 52"
              stroke="#047857"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Red Apple */}
            <circle cx="82" cy="105" r="24" fill="#ef4444" />
            <path
              d="M82 81 C82 72 88 68 90 70"
              stroke="#047857"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Orange Fruit */}
            <circle cx="106" cy="120" r="15" fill="#f97316" />

            {/* Yellow / Mandarin */}
            <circle cx="140" cy="122" r="16" fill="#f59e0b" />
            <path
              d="M140 106 C142 98 146 96 148 98"
              stroke="#047857"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Purple Grape/Plum */}
            <circle cx="64" cy="125" r="14" fill="#a855f7" />

            {/* Basket Body */}
            <path
              d="M50 128 L58 175 C59 178 62 180 66 180 L134 180 C138 180 141 178 142 175 L150 128 Z"
              fill="#9a4c14"
            />
            {/* Basket Top Rim */}
            <rect x="44" y="123" width="112" height="10" rx="4" fill="#78350f" />

            {/* Basket Texture Lines */}
            <path
              d="M72 133 L76 180 M90 133 L92 180 M110 133 L108 180 M128 133 L124 180"
              stroke="#c26b24"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M54 148 C78 154 122 154 146 148 M57 163 C80 169 120 169 143 163"
              stroke="#c26b24"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>
      </section>

      {/* Section A — risers */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">
          <span className="text-red-500">▲</span> আজ দাম বেড়েছে
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {risers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Section B — fallers */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">
          <span className="text-green-600">▼</span> আজ দাম কমেছে
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {fallers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section id="সব-পণ্য" className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">সব পণ্য</h2>
        <p className="text-gray-500">মোট {toBn(products.length)}টি পণ্য দেখানো হচ্ছে</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}