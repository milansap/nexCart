import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingBag, TrendingUp, Shield, Zap, ArrowRight, Tag } from "lucide-react";
import { getAllProducts, getAllCategories } from "@/app/apis/productsApi";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NexCart - Your Premium Online Marketplace",
  description: "Shop smarter, live better with NexCart. Browse thousands of quality products across multiple categories including electronics, jewelry, men's clothing, and women's clothing.",
  keywords: ["online shopping", "e-commerce", "electronics", "clothing", "jewelry", "marketplace"],
  openGraph: {
    title: "NexCart - Your Premium Online Marketplace",
    description: "Shop smarter, live better with NexCart quality products",
    type: "website",
  },
};

export default async function HomePage() {
  // Fetch categories and featured products
  const [categories, allProducts] = await Promise.all([
    getAllCategories(),
    getAllProducts({ limit: 8 }),
  ]);

  // Get 8 featured products
  const featuredProducts = allProducts.slice(0, 8);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f4f7f0] to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold text-[#2d3a1f] mb-6">
            Welcome to NexCart
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your premium marketplace for quality products. Shop smarter, live better.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/products">
              <Button className="bg-gradient-to-br from-[#97A87A] to-[#7a8d60] hover:opacity-90 text-white font-semibold px-8 py-6 text-lg">
                Browse Products
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" className="px-8 py-6 text-lg">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 py-16 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#2d3a1f] mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-600 text-lg">
            Explore our wide range of product categories
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/products?category=${category}`}
              className="group bg-gradient-to-br from-[#f4f7f0] to-white border-2 border-gray-200 rounded-xl p-8 hover:border-[#97A87A] hover:shadow-lg transition-all"
            >
              <div className="text-center">
                <div className="bg-[#97A87A]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#97A87A]/20 transition-colors">
                  <Tag className="text-[#97A87A]" size={32} />
                </div>
                <h3 className="font-bold text-[#2d3a1f] capitalize group-hover:text-[#97A87A] transition-colors">
                  {category.replace("'s", "s")}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#2d3a1f] mb-4">
            Featured Products
          </h2>
          <p className="text-gray-600 text-lg">
            Check out our latest and most popular items
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {featuredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow bg-white"
            >
              <div className="aspect-square relative mb-4 overflow-hidden rounded-md bg-gray-100">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="space-y-2">
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  {product.category}
                </p>
                <h3 className="font-semibold text-sm line-clamp-2 min-h-[2.5rem]">
                  {product.title}
                </h3>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm font-medium">{product.rating.rate}</span>
                  </div>
                </div>
                <p className="text-lg font-bold text-[#97A87A]">${product.price}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center">
          <Link href="/products">
            <Button className="bg-[#97A87A] hover:bg-[#7a8d60] text-white font-semibold px-8 py-4 text-lg group">
              View All Products
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center text-[#2d3a1f] mb-12">
          Why Choose NexCart?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <div className="bg-[#97A87A]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="text-[#97A87A]" size={32} />
            </div>
            <h3 className="text-xl font-bold text-[#2d3a1f] mb-2">
              Wide Selection
            </h3>
            <p className="text-gray-600">
              Thousands of products across multiple categories
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <div className="bg-[#97A87A]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="text-[#97A87A]" size={32} />
            </div>
            <h3 className="text-xl font-bold text-[#2d3a1f] mb-2">
              Best Prices
            </h3>
            <p className="text-gray-600">
              Competitive pricing on all products
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <div className="bg-[#97A87A]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="text-[#97A87A]" size={32} />
            </div>
            <h3 className="text-xl font-bold text-[#2d3a1f] mb-2">
              Secure Shopping
            </h3>
            <p className="text-gray-600">
              Your data and transactions are protected
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <div className="bg-[#97A87A]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="text-[#97A87A]" size={32} />
            </div>
            <h3 className="text-xl font-bold text-[#2d3a1f] mb-2">
              Fast Delivery
            </h3>
            <p className="text-gray-600">
              Quick and reliable shipping options
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-br from-[#97A87A] to-[#7a8d60] rounded-2xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">
            Start Shopping Today
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join thousands of satisfied customers
          </p>
          <Link href="/products">
            <Button className="bg-white text-[#97A87A] hover:bg-gray-100 font-semibold px-8 py-6 text-lg">
              Explore Products
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
