"use client";

import CustomButton from "@/components/shared/custom-button";
import Wrapper from "@/components/shared/wrapper";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/auth-provider";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

export default function WorkspaceDetailsLayout({
  children,
  params: { slug },
}: {
  params: { slug: string };
  children: TNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const { isFetchingUser, address, credentials, isConnected } = useAuth();

  useEffect(() => {
    if (!credentials) {
      if (!address) router.push("/login");
    }
  }, [address, isConnected]);

  const routes = [
    { name: "Links", path: "" },
    { name: "Analytics", path: "/analytics" },
    { name: "Events", path: "/events" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <div className="flex flex-col">
      <div className="w-full bg-background border-b">
        <Wrapper className="flex items-center justify-between size-full h-11">
          <div className="flex items-center size-full gap-3">
            {routes.map((route) => {
              const isActive = pathname === `/workspaces/${slug}${route.path}`;

              return (
                <Link
                  key={route.path}
                  href={`/workspaces/${slug}${route.path}`}
                  className="relative h-8 w-max">
                  <CustomButton
                    variant={"ghost"}
                    className="!h-full capitalize !px-3">
                    {route.name}
                  </CustomButton>

                  {isActive && (
                    <span className="absolute -bottom-1.5 left-0 h-[2px] w-full bg-foreground" />
                  )}
                </Link>
              );
            })}
          </div>
        </Wrapper>
      </div>

      <div className="my-10 w-full">
        <Wrapper>{children}</Wrapper>
      </div>
    </div>
  );
}
