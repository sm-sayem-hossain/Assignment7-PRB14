import Link from "next/link";
import { notFound } from "next/navigation";
import { type Product } from "@/components/ProductCard";
import { toBn, unitBn } from "@/lib/format";

const API = "https://openapi.programming-hero.com/api/bazardor";

// (min+max)/2 — দশমিক থাকলে ২ ঘর পর্যন্ত, নাহলে পূর্ণসংখ্যা
function marketAvg(m: { min: number; max: number }): string {
  const avg = (m.min + m.max) / 2;
  return Number.isInteger(avg) ? toBn(avg) : toBn(avg.toFixed(2));
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // NOTE: single-product endpoint শুধু id দিয়ে কাজ করে,
  // slug দিয়ে নয় — তাই সব product এনে slug মিলিয়ে খুঁজি
  const res = await fetch(`${API}/products`);
  const products: Product[] = await res.json();
  const product = products.find((p) => p.slug === slug);

  // invalid slug — 404 দেখাও
  if (!product) {
    notFound();
  }

  // Price summary — markets array থেকে হিসাব
  const minMarket = product.markets.reduce((a, b) => (a.min <= b.min ? a : b));
  const maxMarket = product.markets.reduce((a, b) => (a.max >= b.max ? a : b));
  const minPrice = minMarket.min;
  const maxPrice = maxMarket.max;
  const avgPrice = Math.round(
    product.markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) /
      product.markets.length
  );

  // গতকালের সাথে তুলনা
  const diff = product.today - product.yesterday;
  const diffText =
    product.change.dir === "flat"
      ? "গতকালের সাথে দাম অপরিবর্তিত"
      : product.change.dir === "up"
        ? `গতকালের তুলনায় আজ দাম বেড়েছে · ${toBn(diff)} টাকা`
        : `গতকালের তুলনায় আজ দাম কমেছে · ${toBn(Math.abs(diff))} টাকা`;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 flex items-center gap-2">
        <Link href="/" className="hover:text-gray-900">
          হোম
        </Link>
        <span>›</span>
        <Link
          href={`/category/${product.category}`}
          className="hover:text-gray-900"
        >
          {product.categoryNameBn}
        </Link>
        <span>›</span>
        <span className="text-gray-900 font-medium">{product.nameBn}</span>
      </nav>

      {/* Top — Summary */}
      <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <span className="text-5xl w-20 h-20 flex items-center justify-center bg-gray-50 rounded-2xl">
              {product.image}
            </span>
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                {product.nameBn}
              </h1>
              <p className="text-sm text-gray-500">
                {unitBn(product.unit)} · {product.categoryNameBn}
              </p>
              <p className="text-sm text-gray-600">{diffText}</p>
            </div>
          </div>
        </div>

        {/* আজকের দাম stat */}
        <div className="bg-gray-50 rounded-2xl px-8 py-5 text-center space-y-1 shrink-0">
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="text-3xl font-extrabold text-gray-900">
            {toBn(product.today)}
          </p>
          <p className="text-xs text-gray-500">টাকা / কেজি</p>
          <p
            className={`text-sm font-bold ${
              product.change.dir === "flat"
                ? "text-gray-500"
                : product.change.dir === "up"
                  ? "text-red-600"
                  : "text-green-600"
            }`}
          >
            {product.change.dir === "flat"
              ? "—"
              : product.change.dir === "up"
                ? "▲"
                : "▼"}{" "}
            {toBn(Math.abs(product.change.pct).toFixed(1))}%
          </p>
        </div>
      </section>

      {/* দামের সারসংক্ষেপ + বাজারভিত্তিক দাম — একই card-এ (Figma অনুযায়ী) */}
      <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-8">
        <h2 className="text-xl font-bold text-gray-900">দামের সারসংক্ষেপ</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-2xl p-5 space-y-1">
            <p className="text-xs font-medium text-gray-400">সর্বনিম্ন দাম</p>
            <p className="text-2xl font-extrabold text-green-600">
              {toBn(minPrice)}{" "}
              <span className="text-sm font-normal text-gray-500">টাকা</span>
            </p>
            <p className="text-xs text-gray-500">
              সবচেয়ে কম দামের বাজার: {minMarket.market}
            </p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-5 space-y-1">
            <p className="text-xs font-medium text-gray-400">সর্বোচ্চ দাম</p>
            <p className="text-2xl font-extrabold text-red-600">
              {toBn(maxPrice)}{" "}
              <span className="text-sm font-normal text-gray-500">টাকা</span>
            </p>
            <p className="text-xs text-gray-500">
              সবচেয়ে বেশি দামের বাজার: {maxMarket.market}
            </p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-5 space-y-1">
            <p className="text-xs font-medium text-gray-400">গড় দাম</p>
            <p className="text-2xl font-extrabold text-green-600">
              {toBn(avgPrice)}{" "}
              <span className="text-sm font-normal text-gray-500">টাকা</span>
            </p>
            <p className="text-xs text-gray-500">
              {unitBn(product.unit)}-র হিসাবে
            </p>
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-900">
          বাজারভিত্তিক আজকের দাম
        </h2>
        <div className="border border-gray-100 rounded-2xl overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 text-left">
                <th className="px-6 py-4 font-medium">বাজার</th>
                <th className="px-6 py-4 font-medium">বিভাগ</th>
                <th className="px-6 py-4 font-medium text-right">সর্বনিম্ন</th>
                <th className="px-6 py-4 font-medium text-right">সর্বোচ্চ</th>
                <th className="px-6 py-4 font-medium text-right">গড়</th>
              </tr>
            </thead>
            <tbody>
              {product.markets.map((m, i) => (
                <tr
                  key={m.market}
                  className={`border-b border-gray-100 last:border-0 ${
                    i % 2 === 1 ? "bg-gray-50" : ""
                  }`}
                >
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {m.market}
                  </td>
                  <td className="px-6 py-4 text-gray-500">{m.division}</td>
                  <td className="px-6 py-4 text-right text-gray-600">
                    {toBn(m.min)} টাকা
                  </td>
                  <td className="px-6 py-4 text-right text-gray-600">
                    {toBn(m.max)} টাকা
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-gray-900">
                    {marketAvg(m)} টাকা
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
