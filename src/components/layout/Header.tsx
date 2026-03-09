"use client";

import Link from "next/link";
import { ShoppingCart, User, LogOut } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { useState, useEffect } from "react";
import { cookies } from "@/lib/cookies";
import { useRouter, usePathname } from "next/navigation";

export function Header() {
  const { cartCount } = useCart();
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Check auth status on mount and when pathname changes
  useEffect(() => {
    setMounted(true);
    const checkAuth = () => {
      const token = cookies.get("token");
      setIsLoggedIn(!!token);
    };
    
    checkAuth();
    
    // Also check periodically to catch login from other tabs
    const interval = setInterval(checkAuth, 1000);
    
    return () => clearInterval(interval);
  }, [pathname]);

  const handleLogout = () => {
    cookies.remove("token");
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-[#2d3a1f]">NexCart</span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            <Link
              href="/products"
              className="text-gray-700 hover:text-[#97A87A] transition-colors font-medium"
            >
              Products
            </Link>

            {!mounted ? (
              // Show placeholder during hydration
              <div className="w-20 h-6 bg-gray-200 animate-pulse rounded"></div>
            ) : isLoggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-1 text-gray-700 hover:text-[#97A87A] transition-colors font-medium"
                >
                  <User size={20} />
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-gray-700 hover:text-red-600 transition-colors font-medium"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1 text-gray-700 hover:text-[#97A87A] transition-colors font-medium"
              >
                <User size={20} />
                Login
              </Link>
            )}

            {/* Cart Link with Badge */}
            {!mounted ? (
              // Show placeholder during hydration
              <div className="w-8 h-8 bg-gray-200 animate-pulse rounded-full"></div>
            ) : isLoggedIn ? (
              <Link
                href="/cart"
                className="relative flex items-center gap-2 text-gray-700 hover:text-[#97A87A] transition-colors font-medium"
                title="View cart"
              >
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#97A87A] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            ) : (
              <Link
                href="/login?returnUrl=/cart"
                className="relative flex items-center gap-2 text-gray-700 hover:text-[#97A87A] transition-colors font-medium"
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
