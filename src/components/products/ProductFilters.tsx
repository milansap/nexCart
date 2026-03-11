"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";

interface ProductFiltersProps {
  categories: string[];
  onFilterChange: (filters: FilterState) => void;
  initialFilters?: FilterState;
}

export interface FilterState {
  category: string;
  minPrice: string;
  maxPrice: string;
  search: string;
}

export function ProductFilters({
  categories,
  onFilterChange,
  initialFilters,
}: ProductFiltersProps) {
  const [filters, setFilters] = useState<FilterState>(
    initialFilters || {
      category: "all",
      minPrice: "",
      maxPrice: "",
      search: "",
    },
  );

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleCategoryChange = (value: string) => {
    setFilters((prev) => ({ ...prev, category: value }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, search: e.target.value }));
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, minPrice: e.target.value }));
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, maxPrice: e.target.value }));
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-6 sticky top-20">
      <div>
        <h3 className="font-bold text-lg mb-4">Filters</h3>
      </div>


      <div>
        <Label htmlFor="search" className="text-sm font-medium mb-2 block">
          Search Products
        </Label>
        <Input
          id="search"
          type="text"
          placeholder="Search by name..."
          value={filters.search}
          onChange={handleSearchChange}
          className="w-full"
        />
      </div>

      <div>
        <Label htmlFor="category" className="text-sm font-medium mb-2 block">
          Category
        </Label>
        <Select value={filters.category} onValueChange={handleCategoryChange}>
          <SelectTrigger id="category" className="w-full">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent position="popper" align="start" sideOffset={4}>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

     
      <div>
        <Label className="text-sm font-medium mb-2 block">Price Range</Label>
        <div className="flex gap-2 items-center">
          <Input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={handleMinPriceChange}
            className="w-full"
            min="0"
            step="0.01"
          />
          <span className="text-gray-500">-</span>
          <Input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={handleMaxPriceChange}
            className="w-full"
            min="0"
            step="0.01"
          />
        </div>
      </div>
    </div>
  );
}
