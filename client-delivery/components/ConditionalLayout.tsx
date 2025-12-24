"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  
  // Routes where we don't want navbar and footer
  const authRoutes = ['/sign-in', '/sign-up'];
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

  if (isAuthRoute) {
    // For auth routes, render only children without navbar/footer
    return <>{children}</>;
  }

  // For all other routes, render with navbar and footer
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}