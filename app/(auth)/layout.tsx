"use client";

import { useAuth } from "@/providers/auth-provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthLayout({ children }: Readonly<IParentLayout>) {
  const router = useRouter();
  const { isFetchingUser, address, credentials, isConnected } = useAuth();

  useEffect(() => {
    if (address) {
      if (credentials) router.push("/workspaces");
    }
  }, [address, isConnected]);

  return (
    <div className="flex flex-1">
      <main className="w-full md:w-[60%] md:border-r flex flex-col items-center px-4">
        <div className="max-w-[446px] w-full mx-auto flex flex-col justify-between flex-1 py-8">
          <span />

          {children}

          <div className="flex flex-col text-center gap-2 w-[185px] mx-auto">
            <p className="text-xs font-medium text-muted-foreground">
              © 2024 Dub Technologies, Inc.
            </p>

            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-muted-foreground underline">
                Privacy Policy
              </p>
              <p className="text-xs font-medium text-muted-foreground underline">
                Terms of Service
              </p>
            </div>
          </div>
        </div>
      </main>

      <div className="flex-1 relative hidden md:flex">
        <div className="absolute inset-0 -z-10 size-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
      </div>
    </div>
  );
}
