
import type { Metadata } from "next";
import { ReactNode } from "react";

export const dynamic = "force-dynamic";

export default async function Layout({
  children,
}: Readonly<{
  children:ReactNode;
}>) {
  return <div>{children}</div>;
}
