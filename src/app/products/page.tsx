import { getAllProducts, getAllCategories } from "@/app/apis/productsApi";
import { ProductsClient } from "@/components/products/ProductsClient";

interface ProductsPageProps {
  searchParams: Promise<{
    sort?: "asc" | "desc";
  }>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const { sort = "asc" } = await searchParams;

  const [products, categories] = await Promise.all([
    getAllProducts({ sort }),
    getAllCategories(),
  ]);

  return <ProductsClient initialProducts={products} categories={categories} />;
}

export const metadata = {
  title: "Products | NexCart",
  description: "Browse our collection of quality products",
};
