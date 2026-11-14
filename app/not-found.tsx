import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
      <p className="text-8xl font-extrabold text-[#0f8a44]">৪০৪</p>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">
          পাতাটি খুঁজে পাওয়া যায়নি
        </h1>
        <p className="text-gray-500 text-sm leading-relaxed">
          দুঃখিত! আপনি যে পাতাটি খুঁজছেন সেটি নেই বা সরিয়ে ফেলা হয়েছে।
          ঠিকানা একবার দেখে নিন, অথবা হোম পেজে ফিরে যান।
        </p>
      </div>
      <Link
        href="/"
        className="inline-block bg-[#0f8a44] hover:bg-[#0b6e35] text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-sm"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
