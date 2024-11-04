import type { Metadata } from "next";

import "@/public/styles/globals.css";
import { fontSans } from "@/public/fonts";
import { cn } from "@/lib/utils";

import { Web3Provider } from "@/providers/web3-provider";
import { siteConfig } from "@/config";

export const metadata: Metadata = {
  title: `${siteConfig.title} - ${siteConfig.slogan}`,
  description: siteConfig.description,
  icons: {
    icon: siteConfig.icon,
  },
};

export default function RootLayout({ children }: Readonly<IParentLayout>) {
  return (
    <html lang="en" suppressContentEditableWarning suppressHydrationWarning>
      <body
        className={cn(
          "min-h-dvh bg-background font-sans antialiased flex flex-col",
          fontSans.variable
        )}>
        <Web3Provider>{children}</Web3Provider>
      </body>
    </html>
  );
}
