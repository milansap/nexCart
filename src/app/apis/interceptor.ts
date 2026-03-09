import { cookies } from "@/lib/cookies";
import { ApiResponse, ErrorResponse } from "./types/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ;

export const API_BASE_URL = `${BASE_URL}/`;
export const MEDIA_BASE_URL = `${BASE_URL}/`;

async function handleResponse<T = ApiResponse>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorDetail: string;
    try {
      const errorData: ErrorResponse = await response.json();
      errorDetail = errorData.error || errorData.message || "An error occurred";
    } catch {
      errorDetail = `HTTP Error: ${response.status} ${response.statusText}`;
    }
    return Promise.reject(errorDetail);
  }

  try {
    return await response.json();
  } catch {
    return {} as T;
  }
}


export const BaseService = {
  get: <T = ApiResponse>(url: string, options?: RequestInit) => {
    return fetch(`${API_BASE_URL}${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        ...options?.headers,
      },
      ...options,
    }).then((res) => handleResponse<T>(res));
  },

  post: <T = ApiResponse>(
    url: string,
    data?: unknown,
    options?: RequestInit,
  ) => {
    return fetch(`${API_BASE_URL}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        ...options?.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    }).then((res) => handleResponse<T>(res));
  },

  put: <T = ApiResponse>(
    url: string,
    data?: unknown,
    options?: RequestInit,
  ) => {
    return fetch(`${API_BASE_URL}${url}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        ...options?.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    }).then((res) => handleResponse<T>(res));
  },

  patch: <T = ApiResponse>(
    url: string,
    data?: unknown,
    options?: RequestInit,
  ) => {
    return fetch(`${API_BASE_URL}${url}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        ...options?.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    }).then((res) => handleResponse<T>(res));
  },

  delete: <T = ApiResponse>(url: string, options?: RequestInit) => {
    return fetch(`${API_BASE_URL}${url}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        ...options?.headers,
      },
      ...options,
    }).then((res) => handleResponse<T>(res));
  },
};

export const AuthService = {
  get: <T = ApiResponse>(url: string, options?: RequestInit) => {
    const token = cookies.get("token");
    return fetch(`${API_BASE_URL}${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token || "no_token"}`,
        ...options?.headers,
      },
      ...options,
    }).then((res) => handleResponse<T>(res));
  },

  post: <T = ApiResponse>(
    url: string,
    data?: unknown,
    options?: RequestInit,
  ) => {
    const token = cookies.get("token");
    return fetch(`${API_BASE_URL}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token || "no_token"}`,
        ...options?.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    }).then((res) => handleResponse<T>(res));
  },

  put: <T = ApiResponse>(
    url: string,
    data?: unknown,
    options?: RequestInit,
  ) => {
    const token = cookies.get("token");
    return fetch(`${API_BASE_URL}${url}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token || "no_token"}`,
        ...options?.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    }).then((res) => handleResponse<T>(res));
  },

  patch: <T = ApiResponse>(
    url: string,
    data?: unknown,
    options?: RequestInit,
  ) => {
    const token = cookies.get("token");
    return fetch(`${API_BASE_URL}${url}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token || "no_token"}`,
        ...options?.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    }).then((res) => handleResponse<T>(res));
  },

  delete: <T = ApiResponse>(url: string, options?: RequestInit) => {
    const token = cookies.get("token");
    return fetch(`${API_BASE_URL}${url}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token || "no_token"}`,
        ...options?.headers,
      },
      ...options,
    }).then((res) => handleResponse<T>(res));
  },
};
