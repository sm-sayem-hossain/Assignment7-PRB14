import Link from "next/link";
import { toBn, unitBn } from "@/lib/format";

export type Market = {
  market: string;
  division: string;
  min: number;
  max: number;
};

export type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  change: { dir: "up" | "down" | "flat"; pct: number };
  markets: Market[];
};

function ChangeBadge({ dir, pct }: { dir: "up" | "down" | "flat"; pct: number }) {
  if (dir === "flat") {
    return (
      <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
        — {toBn(pct.toFixed(1))}%
      </span>
    );
  }

  const isUp = dir === "up";

  return (
    <span
      className={`text-xs font-medium px-2 py-0.5 rounded-full ${
        isUp ? "text-red-600 bg-red-50" : "text-green-600 bg-green-50"
      }`}
    >
      {isUp ? "▲" : "▼"} {toBn(Math.abs(pct).toFixed(1))}%
    </span>
  );
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-4 space-y-3"
    >
      <div className="flex items-center gap-3">
        <span className="text-3xl w-12 h-12 flex items-center justify-center bg-gray-50 rounded-xl">
          {product.image}
        </span>
        <div>
          <h3 className="font-bold text-gray-900">{product.nameBn}</h3>
          <p className="text-xs text-gray-400">{unitBn(product.unit)}</p>
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs text-gray-400">আজকের দাম</p>
          <p className="text-xl font-extrabold text-gray-900">
            {toBn(product.today)}{" "}
            <span className="text-xs font-normal text-gray-500">টাকা</span>
          </p>
        </div>
        <ChangeBadge dir={product.change.dir} pct={product.change.pct} />
      </div>
    </Link>
  );
}