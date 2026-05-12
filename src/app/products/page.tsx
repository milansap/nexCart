import { getAllProducts, getAllCategories } from "@/app/apis/productsApi";
import { ProductsClient } from "@/components/products/ProductsClient";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

interface ProductsPageProps {
  searchParams: Promise<{
    sort?: "asc" | "desc";
  }>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  try {
    const { sort = "asc" } = await searchParams;

    const [products, categories] = await Promise.all([
      getAllProducts({ sort }),
      getAllCategories(),
    ]);

    return <ProductsClient initialProducts={products} categories={categories} />;
  } catch (error) {
    console.error("Failed to load products page data:", error);

    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-xl mx-auto text-center bg-white border border-gray-200 rounded-2xl p-10 shadow-sm">
          <h1 className="text-3xl font-bold text-[#2d3a1f] mb-3">
            Products Temporarily Unavailable
          </h1>
          <p className="text-gray-600 mb-8">
            We could not load the product catalog right now. Please try again in
            a moment.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link href="/products">
              <Button className="bg-[#97A87A] hover:bg-[#7a8d60] text-white">
                Retry
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline">Go Home</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export const metadata = {
  title: "Products | NexCart",
  description: "Browse our collection of quality products",
};
