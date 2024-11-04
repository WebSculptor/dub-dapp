"use client";

import { Link2, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AnalyticsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const search = searchParams.get("domain");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-bold">Analytics</h2>

        <div className="flex items-center h-9">
          <div className="rounded-l-md border border-r-0 bg-background h-full px-3 flex items-center gap-2">
            <Link2 size={16} />
            <p className="text-sm font-medium">Link</p>
          </div>
          <div className="border border-r-0 bg-background h-full px-3 flex items-center gap-2">
            <p className="text-sm font-medium">is</p>
          </div>
          <div className="border border-r-0 bg-background h-full px-3 flex items-center gap-2">
            <p className="text-sm font-medium">{search}</p>
          </div>
          <div
            onClick={() => router.back()}
            className="border rounded-l-none rounded-md bg-background h-full px-2 flex items-center gap-2 cursor-pointer">
            <X size={16} />
          </div>
        </div>
      </div>
    </div>
  );
}
