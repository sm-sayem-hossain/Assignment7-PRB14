import { notFound } from "next/navigation";
import { type Product } from "@/components/ProductCard";
import CategoryProducts from "@/components/CategoryProducts";
import { toBn } from "@/lib/format";

const API = "https://openapi.programming-hero.com/api/bazardor";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const res = await fetch(`${API}/products`);
  const products: Product[] = await res.json();
  const categoryProducts = products.filter((p) => p.category === slug);

  // invalid slug — এই category-র কোনো পণ্য নেই
  if (categoryProducts.length === 0) {
    notFound();
  }

  const first = categoryProducts[0];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Category header */}
      <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 flex items-center gap-4">
        <span className="text-4xl w-16 h-16 flex items-center justify-center bg-gray-50 rounded-2xl">
          {first.categoryIcon}
        </span>
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            {first.categoryNameBn}
          </h1>
          <p className="text-sm text-gray-500">
            {toBn(categoryProducts.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </section>

      {/* Products */}
      <p className="text-sm text-gray-500">
        মোট {toBn(categoryProducts.length)}টি পণ্য দেখানো হচ্ছে
      </p>
      <CategoryProducts products={categoryProducts} />
    </div>
  );
}
