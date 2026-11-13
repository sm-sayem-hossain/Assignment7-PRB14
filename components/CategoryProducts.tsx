"use client";

import { useState } from "react";
import ProductCard, { type Product } from "@/components/ProductCard";

type SortOption = "default" | "asc" | "desc";

export default function CategoryProducts({ products }: { products: Product[] }) {
  const [sortBy, setSortBy] = useState<SortOption>("default");

  const sorted = [...products].sort((a, b) => {
    if (sortBy === "asc") return a.today - b.today;
    if (sortBy === "desc") return b.today - a.today;
    return 0; // default — API-র order
  });

  return (
    <div className="space-y-6">
      {/* Sort bar */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm px-6 py-4 flex justify-end items-center gap-3">
        <span className="text-sm text-gray-500">সাজান</span>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="default">ডিফল্ট</option>
          <option value="asc">দাম: কম থেকে বেশি</option>
          <option value="desc">দাম: বেশি থেকে কম</option>
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sorted.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
