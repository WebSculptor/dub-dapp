"use client";

import DashboardHeader from "@/components/shared/dashboard-header";
import { useAuth } from "@/providers/auth-provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({ children }: Readonly<IParentLayout>) {
  const { address, credentials, isConnected } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isConnected || !credentials) {
      router.push("/login");
    }
  }, [isConnected, credentials, router]);

  return (
    <div className="flex-1 bg-secondary/50">
      <DashboardHeader />
      {children}
    </div>
  );
}
