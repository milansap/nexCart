import { getProductById } from "@/app/apis/productsApi";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
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
    console.log("Fetched product:", product);

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.title,
      image: product.image,
      description: product.description,
      brand: {
        "@type": "Brand",
        name: "NexCart",
      },
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

    return (
      <div className="container mx-auto px-4 py-8">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-[#97A87A] hover:underline mb-6"
        >
          <ArrowLeft size={20} />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-lg border border-gray-200 p-8">
         
          <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain p-8"
              priority
            />
          </div>

        
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">
                {product.category}
              </p>
              <h1 className="text-3xl font-bold text-[#2d3a1f] mb-4">
                {product.title}
              </h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500 text-xl">★</span>
                  <span className="text-lg font-semibold">
                    {product.rating.rate}
                  </span>
                  <span className="text-gray-500">
                    ({product.rating.count} reviews)
                  </span>
                </div>
              </div>
              <p className="text-4xl font-bold text-[#97A87A]">
                ${product.price}
              </p>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h2 className="font-semibold text-lg mb-3">Description</h2>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <AddToCartButton product={product} />
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Product Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            {error instanceof Error ? error.message : "An error occurred"}
          </p>
          <Link href="/products">
            <Button>Back to Products</Button>
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
    return {
      title: "Product Not Found | NexCart",
    };
  }
}
