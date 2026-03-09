import Image from "next/image";
import Link from "next/link";
import { Product } from "@/app/apis/types/product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
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
            <span className="text-xs text-gray-500">
              ({product.rating.count})
            </span>
          </div>
        </div>
        <p className="text-lg font-bold text-[#97A87A]">${product.price}</p>
      </div>
    </Link>
  );
}
