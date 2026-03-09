"use client";

import {
  Eye,
  EyeOff,
  ShoppingBag,
  ArrowRight,
  Leaf,
  Loader2,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/app/apis/authApi";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { loginSchema } from "@/lib/zodScheme";
import { useRouter } from "next/navigation";
import { cookies } from "@/lib/cookies";

type LoginFormValues = z.infer<typeof loginSchema>;

export default function NexCartLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const router = useRouter();

  // Check if already logged in
  useEffect(() => {
    const token = cookies.get("token");
    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const username = watch("username");
  const password = watch("password");

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const response = await login(values);

      if (response?.token) {
        cookies.set("token", response.token);
        
        // Redirect to the previous page or dashboard
        const returnUrl = new URLSearchParams(window.location.search).get("returnUrl");
        router.push(returnUrl || "/dashboard");
      } else {
        setSubmitError("Login failed");
      }
    } catch (error) {
      setSubmitError(
        typeof error === "string"
          ? error
          : error instanceof Error
            ? error.message
            : "An error occurred",
      );
    }
  };

  return (
    <div className="min-h-screen flex font-serif bg-[#f4f7f0] relative overflow-hidden">
      <div className="absolute -top-30 -left-30 w-105 h-105 rounded-full bg-[radial-gradient(circle,_#b8c9a055_0%,_transparent_70%)] z-0" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-[radial-gradient(circle,_#97A87A44_0%,_transparent_70%)] z-0" />

      <div className="flex-1 min-w-90 flex flex-col justify-center items-center px-12 py-15 bg-gradient-to-br from-[#97A87A] to-[#7a8d60] relative overflow-hidden">
        <div className="absolute top-7 right-7 opacity-[0.18]">
          <Leaf size={88} className="text-white" />
        </div>
        <div className="absolute bottom-11 left-6 opacity-[0.13] rotate-[50deg]">
          <Leaf size={64} className="text-white" />
        </div>
        <div className="absolute bottom-30 right-10 opacity-10 -rotate-[20deg]">
          <Leaf size={40} className="text-white" />
        </div>

        <div className="relative z-10 text-center max-w-80">
          <div className="flex items-center gap-3 justify-center mb-13">
            <div className="bg-white/22 rounded-[14px] p-2.5 backdrop-blur-[10px] flex">
              <ShoppingBag size={28} className="text-white" />
            </div>
            <span className="text-[30px] font-extrabold text-white tracking-[3px]">
              NexCart
            </span>
          </div>

          <h2 className="text-[44px] font-extrabold text-white leading-[1.1] mb-5">
            Shop
            <br />
            Smarter.
            <br />
            Live Better.
          </h2>

          <p className="text-white/78 text-[15px] leading-[1.75]">
            Your curated marketplace for quality goods — thoughtfully sourced,
            beautifully delivered.
          </p>
        </div>
      </div>

      <div className="flex-[1.3] flex items-center justify-center p-12 px-10 relative z-10">
        <Card className="w-full max-w-110 border-[1.5px] border-[#dde8d0] rounded-[20px] shadow-[0_8px_48px_rgba(151,168,122,0.13)] bg-white">
          <CardHeader className="pb-1">
            <CardTitle className="text-[28px] font-bold text-[#2d3a1f] font-serif">
              Welcome back
            </CardTitle>
            <CardDescription className="text-[#6b7a5a] text-[14.5px]">
              Sign in to your NexCart account
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-5">
            {submitError && (
              <Alert className="mb-4.5 border border-[#b8c9a0] bg-[#fdf8f2] rounded-[10px]">
                <AlertDescription className="text-[#7a5020] text-[13px]">
                  {submitError}
                </AlertDescription>
              </Alert>
            )}

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4.5"
            >
              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="username"
                  className="text-[11.5px] font-bold text-[#3d4e2a] tracking-[0.7px] uppercase"
                >
                  username
                </Label>
                <Input
                  id="username"
                  type="username"
                  placeholder="you@example.com"
                  {...register("username")}
                  className={`rounded-[11px] border-[1.5px] ${
                    errors.username
                      ? "border-red-500"
                      : username
                        ? "border-[#97A87A]"
                        : "border-[#d4dbc8]"
                  } px-3.5 py-3 text-[14.5px] text-[#2d3a1f] font-serif focus:border-[#97A87A] transition-colors`}
                />
                {errors.username && (
                  <p className="text-xs text-red-600">{errors.username.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <Label
                    htmlFor="password"
                    className="text-[11.5px] font-bold text-[#3d4e2a] tracking-[0.7px] uppercase"
                  >
                    Password
                  </Label>
                  <a
                    href="#"
                    className="text-[12.5px] text-[#7a8d60] no-underline font-medium hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>

                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...register("password")}
                    className={`rounded-[11px] border-[1.5px] ${
                      errors.password
                        ? "border-red-500"
                        : password
                          ? "border-[#97A87A]"
                          : "border-[#d4dbc8]"
                    } py-3 pl-3.5 pr-11 text-[14.5px] text-[#2d3a1f] font-serif focus:border-[#97A87A] transition-colors w-full`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[#8a9a70] w-8 h-8"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3.25 h-auto  cursor-pointer ${
                  isSubmitting
                    ? "bg-[#b8c9a0]"
                    : "bg-gradient-to-br from-[#97A87A] to-[#7a8d60]"
                } text-white rounded-[11px] text-[15px] font-bold flex items-center justify-center gap-2.5 tracking-[0.4px] shadow-[0_4px_18px_rgba(151,168,122,0.33)] font-serif ${
                  isSubmitting ? "cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={17} />
                  </>
                )}
              </Button>
            </form>

            <div className="flex items-center gap-3.5 my-6">
              <Separator className="flex-1 bg-[#dde8d0]" />
              <span className="text-[#9aaa80] text-xs whitespace-nowrap">
                Easy Shop{" "}
              </span>
              <Separator className="flex-1 bg-[#dde8d0]" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
