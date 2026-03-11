"use client";

import { useCart } from "@/context/cart-context";
import { Product } from "@/app/apis/types/product";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Lock } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "@/lib/authStore";
import { useRouter } from "next/navigation";

interface AddToCartButtonProps {
  product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const { isLoggedIn } = useAuthStore();
  const router = useRouter();

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      router.push(`/login?returnUrl=/products/${product.id}`);
      return;
    }
    
    addItem(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Button
      onClick={handleAddToCart}
      className="w-full bg-gradient-to-br from-[#97A87A] to-[#7a8d60] hover:opacity-90 text-white font-semibold py-6 text-lg"
    >
      {!isLoggedIn ? (
        <>
          <Lock className="mr-2" size={20} />
          Login to Add to Cart
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2" size={20} />
          {added ? "Added to Cart!" : "Add to Cart"}
        </>
      )}
    </Button>
  );
}
