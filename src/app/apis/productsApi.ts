import { BaseService } from "./interceptor";
import { Product, ProductsQueryParams } from "./types/product";

export async function getAllProducts(
  params?: ProductsQueryParams,
): Promise<Product[]> {
  let queryString = "";
  if (params) {
    const queryParams = new URLSearchParams();
    if (params.sort) queryParams.set("sort", params.sort);
    if (params.limit) queryParams.set("limit", params.limit.toString());
    queryString = queryParams.toString() ? `?${queryParams.toString()}` : "";
  }
  return await BaseService.get<Product[]>(`products${queryString}`);
}

export async function getProductById(id: number): Promise<Product> {
  return await BaseService.get<Product>(`products/${id}`);
}

export async function getAllCategories(): Promise<string[]> {
  return await BaseService.get<string[]>("products/categories");
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  return await BaseService.get<Product[]>(`products/category/${category}`);
}
