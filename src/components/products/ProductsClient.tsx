"use client";

import { Product } from "@/app/apis/types/product";
import { ProductsGrid } from "@/components/products/ProductsGrid";
import {
  ProductFilters,
  FilterState,
} from "@/components/products/ProductFilters";
import { useState, useMemo, useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Pagination } from "@/components/pagination/Pagination";

interface ProductsClientProps {
  initialProducts: Product[];
  categories: string[];
}

const ITEMS_PER_PAGE = 12;

export function ProductsClient({
  initialProducts,
  categories,
}: ProductsClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<FilterState>({
    category: searchParams.get("category") || "all",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    search: searchParams.get("search") || "",
  });

  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") || "1")
  );

  
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (filters.category && filters.category !== "all") {
      params.set("category", filters.category);
    }
    if (filters.minPrice) {
      params.set("minPrice", filters.minPrice);
    }
    if (filters.maxPrice) {
      params.set("maxPrice", filters.maxPrice);
    }
    if (filters.search) {
      params.set("search", filters.search);
    }
    if (currentPage > 1) {
      params.set("page", currentPage.toString());
    }

    const queryString = params.toString();
    const newUrl = queryString ? `/products?${queryString}` : "/products";
    
    router.push(newUrl, { scroll: false });
  }, [filters, currentPage, router]);

  const handleFilterChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = [...initialProducts];

    
    if (filters.category && filters.category !== "all") {
      filtered = filtered.filter(
        (product) => product.category === filters.category,
      );
    }

  
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchLower),
      );
    }

  
    if (filters.minPrice) {
      const minPrice = parseFloat(filters.minPrice);
      filtered = filtered.filter((product) => product.price >= minPrice);
    }

    if (filters.maxPrice) {
      const maxPrice = parseFloat(filters.maxPrice);
      filtered = filtered.filter((product) => product.price <= maxPrice);
    }

    return filtered;
  }, [initialProducts, filters]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#2d3a1f] mb-2">Products</h1>
        <p className="text-gray-600">
          Browse our collection of quality products
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
  
        <aside className="lg:col-span-1">
          <ProductFilters
            categories={categories}
            onFilterChange={handleFilterChange}
            initialFilters={filters}
          />
        </aside>

        
        <main className="lg:col-span-3">
          <div className="mb-4 flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Showing {startIndex + 1}-
              {Math.min(startIndex + ITEMS_PER_PAGE, filteredProducts.length)} of{" "}
              {filteredProducts.length} products
            </p>
          </div>
          
          <ProductsGrid products={paginatedProducts} />
          
          {totalPages > 1 && (
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
