"use client";

import { useState, useEffect } from "react";
import { cookies } from "@/lib/cookies";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = cookies.get("token");
    setIsAuthenticated(!!token);
    setLoading(false);
  }, []);

  const logout = () => {
    cookies.remove("token");
    setIsAuthenticated(false);
  };

  const login = (token: string) => {
    cookies.set("token", token);
    setIsAuthenticated(true);
  };

  return {
    isAuthenticated,
    loading,
    logout,
    login,
  };
}
