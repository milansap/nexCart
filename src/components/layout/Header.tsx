"use client";

import Link from "next/link";
import { ShoppingCart, User, LogOut, Menu, X } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/authStore";

export function Header() {
  const { cartCount } = useCart();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isLoggedIn, removeToken } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    removeToken();
    router.push("/login");
    setMobileMenuOpen(false);
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="bg-[#97A87A] border-b border-[#7a8d60] sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <span className="text-xl md:text-2xl font-bold text-white">NexCart</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link
              href="/products"
              className="text-white hover:text-white/70 transition-colors font-medium text-sm lg:text-base"
            >
              Products
            </Link>

            {!mounted ? (
              <div className="w-20 h-6 bg-white/30 animate-pulse rounded"></div>
            ) : isLoggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-1 text-white hover:text-white/70 transition-colors font-medium text-sm lg:text-base"
                >
                  <User size={18} className="lg:w-5 lg:h-5" />
                  <span className="hidden lg:inline">Dashboard</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 cursor-pointer text-white hover:text-red-200 transition-colors font-medium text-sm lg:text-base"
                >
                  <LogOut size={18} className="lg:w-5 lg:h-5" />
                  <span className="hidden lg:inline">Logout</span>
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1 text-white hover:text-white/70 transition-colors font-medium text-sm lg:text-base"
              >
                <User size={18} className="lg:w-5 lg:h-5" />
                <span className="hidden lg:inline">Login</span>
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
                <ShoppingCart size={24} className="lg:w-6 lg:h-6" />
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
                <ShoppingCart size={24} className="lg:w-6 lg:h-6" />
              </Link>
            )}
          </nav>

          <div className="md:hidden flex items-center gap-3">
            {!mounted ? (
              <div className="w-8 h-8 bg-white/30 animate-pulse rounded-full"></div>
            ) : isLoggedIn ? (
              <Link
                href="/cart"
                className="relative flex items-center text-white hover:text-white/70 transition-colors"
                title="View cart"
              >
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white text-[#97A87A] text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            ) : (
              <Link
                href="/login?returnUrl=/cart"
                className="relative flex items-center text-white hover:text-white/70 transition-colors"
                title="Login to access cart"
              >
                <ShoppingCart size={20} />
              </Link>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-white/70 transition-colors p-1"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-[#7a8d60]">
            <div className="flex flex-col gap-4">
              <Link
                href="/products"
                onClick={closeMobileMenu}
                className="text-white hover:text-white/70 transition-colors font-medium py-2 px-0"
              >
                Products
              </Link>

              {!mounted ? (
                <div className="w-20 h-6 bg-white/30 animate-pulse rounded"></div>
              ) : isLoggedIn ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-2 text-white hover:text-white/70 transition-colors font-medium py-2 px-0"
                  >
                    <User size={20} />
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className=" flex items-center gap-2 text-white hover:text-red-200 transition-colors font-medium py-2 px-0 text-left"
                  >
                    <LogOut size={20} />
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-2 text-white hover:text-white/70 transition-colors font-medium py-2 px-0"
                >
                  <User size={20} />
                  Login
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
