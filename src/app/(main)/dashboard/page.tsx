"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/authStore";
import { ShoppingBag, Package, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";

export default function DashboardPage() {
  const router = useRouter();
  const { cartCount, cartTotal } = useCart();
  const { isLoggedIn, removeToken } = useAuthStore();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  const handleLogout = () => {
    removeToken();
    router.push("/login");
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-[#2d3a1f]">Dashboard</h1>
        <Button 
          onClick={handleLogout}
          variant="outline"
          className="text-red-600 hover:bg-red-50"
        >
          Logout
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Cart Items</p>
              <p className="text-3xl font-bold text-[#97A87A]">{cartCount}</p>
            </div>
            <div className="bg-[#97A87A]/10 p-3 rounded-full">
              <ShoppingBag className="text-[#97A87A]" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Cart Total</p>
              <p className="text-3xl font-bold text-[#97A87A]">
                ${cartTotal.toFixed(2)}
              </p>
            </div>
            <div className="bg-[#97A87A]/10 p-3 rounded-full">
              <TrendingUp className="text-[#97A87A]" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Products</p>
              <p className="text-3xl font-bold text-[#97A87A]">20</p>
            </div>
            <div className="bg-[#97A87A]/10 p-3 rounded-full">
              <Package className="text-[#97A87A]" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Account</p>
              <p className="text-xl font-bold text-[#97A87A]">Active</p>
            </div>
            <div className="bg-[#97A87A]/10 p-3 rounded-full">
              <Users className="text-[#97A87A]" size={24} />
            </div>
          </div>
        </div>
      </div>

      
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-[#2d3a1f] mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/products">
            <Button className="w-full bg-[#97A87A] hover:bg-[#7a8d60] text-white">
              Browse Products
            </Button>
          </Link>
          <Link href="/cart">
            <Button className="w-full bg-[#97A87A] hover:bg-[#7a8d60] text-white">
              View Cart
            </Button>
          </Link>
          <Link href="/products">
            <Button variant="outline" className="w-full">
              View Orders
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
