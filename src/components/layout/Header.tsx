"use client";

import Link from "next/link";
import { ShoppingCart, User, LogOut } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/authStore";

export function Header() {
  const { cartCount } = useCart();
  const [mounted, setMounted] = useState(false);
  const { isLoggedIn, removeToken } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    removeToken();
    router.push("/login");
  };

  return (
    <header className="bg-[#97A87A] border-b border-[#7a8d60] sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-white">NexCart</span>
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              href="/products"
              className="text-white hover:text-white/70 transition-colors font-medium"
            >
              Products
            </Link>

            {!mounted ? (
              <div className="w-20 h-6 bg-white/30 animate-pulse rounded"></div>
            ) : isLoggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-1 text-white hover:text-white/70 transition-colors font-medium"
                >
                  <User size={20} />
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-white hover:text-red-200 transition-colors font-medium"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1 text-white hover:text-white/70 transition-colors font-medium"
              >
                <User size={20} />
                Login
              </Link>
            )}

            {!mounted ? (
              <div className="w-8 h-8 bg-white/30 animate-pulse rounded-full"></div>
            ) : isLoggedIn ? (
              <Link
                href="/cart"
                className="relative flex items-center gap-2 text-white hover:text-white/70 transition-colors font-medium"
                title="View cart"
              >
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white text-[#97A87A] text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            ) : (
              <Link
                href="/login?returnUrl=/cart"
                className="relative flex items-center gap-2 text-white hover:text-white/70 transition-colors font-medium"
                title="Login to access cart"
              >
                <ShoppingCart size={24} />
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
