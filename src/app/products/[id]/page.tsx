import { getProductById } from "@/app/apis/productsApi";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Star,
  ShieldCheck,
  Truck,
  RefreshCw,
  Tag,
} from "lucide-react";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { Button } from "@/components/ui/button";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  try {
    const product = await getProductById(parseInt(id));

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.title,
      image: product.image,
      description: product.description,
      brand: { "@type": "Brand", name: "NexCart" },
      offers: {
        "@type": "Offer",
        price: product.price,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.rating.rate,
        reviewCount: product.rating.count,
      },
    };

    const fullStars = Math.floor(product.rating.rate);
    const hasHalfStar = product.rating.rate % 1 >= 0.5;

    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f8faf5] to-[#eef1e8]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <div className="border-b border-[#e0e8d0] bg-white/70 backdrop-blur-sm sticky top-0 z-10">
          <div className="container mx-auto px-4 py-3 flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-[#97A87A] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/products"
              className="hover:text-[#97A87A] transition-colors"
            >
              Products
            </Link>
            <span>/</span>
            <span className="text-[#2d3a1f] font-medium truncate max-w-[200px]">
              {product.title}
            </span>
          </div>
        </div>

        <div className="container mx-auto px-4 py-10">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-[#97A87A] hover:text-[#7a8f5f] font-medium transition-colors mb-8 group"
          >
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to Products
          </Link>

          <div className="bg-white rounded-2xl shadow-xl border border-[#e0e8d0] overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <div className="relative bg-gradient-to-br from-[#f4f7ee] to-[#e8eede] flex items-center justify-center p-12 min-h-[420px] md:min-h-[560px]">
                <div className="absolute top-8 left-8 w-24 h-24 rounded-full bg-[#97A87A]/10 blur-xl" />
                <div className="absolute bottom-8 right-8 w-32 h-32 rounded-full bg-[#2d3a1f]/5 blur-2xl" />

                <div className="relative w-full max-w-sm aspect-square">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain drop-shadow-xl"
                    priority
                  />
                </div>

                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 border border-green-200 text-xs font-semibold px-3 py-1.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    In Stock
                  </span>
                </div>
              </div>

              <div className="p-8 md:p-10 flex flex-col justify-between gap-6">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#97A87A] bg-[#97A87A]/10 px-3 py-1 rounded-full mb-3">
                    <Tag size={11} />
                    {product.category}
                  </span>

                  <h1 className="text-2xl md:text-3xl font-bold text-[#2d3a1f] leading-snug mb-4">
                    {product.title}
                  </h1>

                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={
                            i < fullStars
                              ? "text-yellow-400 fill-yellow-400"
                              : i === fullStars && hasHalfStar
                                ? "text-yellow-400 fill-yellow-200"
                                : "text-gray-200 fill-gray-200"
                          }
                        />
                      ))}
                    </div>
                    <span className="font-semibold text-[#2d3a1f]">
                      {product.rating.rate}
                    </span>
                    <span className="text-gray-400 text-sm">·</span>
                    <span className="text-gray-500 text-sm">
                      {product.rating.count} reviews
                    </span>
                  </div>

                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="text-4xl font-extrabold text-[#97A87A]">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      ${(product.price * 1.2).toFixed(2)}
                    </span>
                    <span className="text-xs font-bold text-red-500 bg-red-50 border border-red-100 px-2 py-0.5 rounded-full">
                      20% OFF
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mb-6">
                    Inclusive of all taxes
                  </p>
                </div>

                <div className="border-t border-dashed border-[#e0e8d0]" />

                <div>
                  <h2 className="text-sm font-bold uppercase tracking-wider text-[#2d3a1f] mb-2">
                    About this product
                  </h2>
                  <p className="text-gray-600 leading-relaxed text-sm line-clamp-4">
                    {product.description}
                  </p>
                </div>

                <div className="border-t border-dashed border-[#e0e8d0]" />

                <div className="grid grid-cols-3 gap-3">
                  {[
                    {
                      icon: Truck,
                      label: "Free Shipping",
                      sub: "On orders $50+",
                    },
                    {
                      icon: RefreshCw,
                      label: "Easy Returns",
                      sub: "30-day policy",
                    },
                    {
                      icon: ShieldCheck,
                      label: "Secure Pay",
                      sub: "100% protected",
                    },
                  ].map(({ icon: Icon, label, sub }) => (
                    <div
                      key={label}
                      className="flex flex-col items-center text-center gap-1.5 p-3 rounded-xl bg-[#f8faf5] border border-[#e0e8d0]"
                    >
                      <Icon size={18} className="text-[#97A87A]" />
                      <span className="text-xs font-semibold text-[#2d3a1f]">
                        {label}
                      </span>
                      <span className="text-[10px] text-gray-400">{sub}</span>
                    </div>
                  ))}
                </div>
 
                <div className=" flex justify-end pt-2 ">
                  <AddToCartButton product={product} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f8faf5] to-[#eef1e8] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg border border-[#e0e8d0] p-12 text-center max-w-md w-full">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">🔍</span>
          </div>
          <h1 className="text-2xl font-bold text-[#2d3a1f] mb-3">
            Product Not Found
          </h1>
          <p className="text-gray-500 mb-8">
            {error instanceof Error
              ? error.message
              : "This product doesn't exist or may have been removed."}
          </p>
          <Link href="/products">
            <Button className="bg-[#97A87A] hover:bg-[#7a8f5f] text-white px-8 py-2.5 rounded-xl font-semibold transition-colors">
              Browse All Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params;
  try {
    const product = await getProductById(parseInt(id));
    return {
      title: `${product.title} | NexCart`,
      description: product.description,
      openGraph: {
        title: product.title,
        description: product.description,
        images: [product.image],
        type: "website",
      },
    };
  } catch {
    return { title: "Product Not Found | NexCart" };
  }
}
