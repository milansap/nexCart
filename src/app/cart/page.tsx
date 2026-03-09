"use client";

import { useCart } from "@/context/cart-context";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, ShoppingBag, ArrowLeft, Lock } from "lucide-react";
import { useEffect, useState } from "react";
import { cookies } from "@/lib/cookies";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, cartTotal, cartCount } =
    useCart();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = cookies.get("token");
    if (!token) {
      // Redirect to login if not authenticated, with return URL
      router.push("/login?returnUrl=/cart");
    } else {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#97A87A]"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-md mx-auto">
          <ShoppingBag className="mx-auto mb-4 text-gray-400" size={80} />
          <h1 className="text-3xl font-bold text-[#2d3a1f] mb-4">
            Your cart is empty
          </h1>
          <p className="text-gray-600 mb-8">
            Add some products to get started!
          </p>
          <Link href="/products">
            <Button className="bg-[#97A87A] hover:bg-[#7a8d60] text-white">
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/products"
        className="inline-flex items-center gap-2 text-[#97A87A] hover:underline mb-6"
      >
        <ArrowLeft size={20} />
        Continue Shopping
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-[#2d3a1f]">
              Shopping Cart ({cartCount} items)
            </h1>
            <Button
              variant="outline"
              onClick={clearCart}
              className="text-red-600 hover:bg-red-50"
            >
              Clear Cart
            </Button>
          </div>

          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="bg-white border border-gray-200 rounded-lg p-6 flex gap-4"
              >
                {/* Product Image */}
                <Link
                  href={`/products/${item.product.id}`}
                  className="relative w-24 h-24 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden"
                >
                  <Image
                    src={item.product.image}
                    alt={item.product.title}
                    fill
                    className="object-contain p-2"
                  />
                </Link>

                {/* Product Info */}
                <div className="flex-1">
                  <Link href={`/products/${item.product.id}`}>
                    <h3 className="font-semibold text-[#2d3a1f] hover:text-[#97A87A] mb-1">
                      {item.product.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-500 capitalize mb-2">
                    {item.product.category}
                  </p>
                  <p className="text-lg font-bold text-[#97A87A]">
                    ${item.product.price.toFixed(2)}
                  </p>
                </div>

                {/* Quantity & Remove */}
                <div className="flex flex-col items-end justify-between">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(item.product.id)}
                    className="text-red-600 hover:bg-red-50"
                  >
                    <Trash2 size={18} />
                  </Button>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                      className="h-8 w-8 p-0"
                    >
                      -
                    </Button>
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(
                          item.product.id,
                          parseInt(e.target.value) || 1
                        )
                      }
                      className="w-16 h-8 text-center"
                      min="1"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                      className="h-8 w-8 p-0"
                    >
                      +
                    </Button>
                  </div>

                  <p className="text-sm font-semibold text-gray-700">
                    Subtotal: ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-4">
            <h2 className="text-xl font-bold text-[#2d3a1f] mb-4">
              Order Summary
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal ({cartCount} items)</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="border-t pt-3 flex justify-between text-lg font-bold text-[#2d3a1f]">
                <span>Total</span>
                <span className="text-[#97A87A]">${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <Button className="w-full bg-gradient-to-br from-[#97A87A] to-[#7a8d60] hover:opacity-90 text-white font-semibold py-6 text-lg">
              Proceed to Checkout
            </Button>

            <p className="text-xs text-gray-500 text-center mt-4">
              Taxes calculated at checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
