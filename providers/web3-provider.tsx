"use client";

import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider } from "connectkit";
import { env } from "@/services/env";
import { getDefaultConfig } from "connectkit";
import { anvil } from "viem/chains";
import { createConfig, http } from "wagmi";

import NextTopLoader from "nextjs-toploader";
import { siteConfig } from "@/config";
import { Toaster } from "sonner";
import AuthProvider from "./auth-provider";

export const ckConfig = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [anvil],
    transports: {
      // RPC URL for each chain
      [anvil.id]: http(env.rpcUrl),
    },

    // Required API Keys
    walletConnectProjectId: env.projectId,

    // Required App Info
    appName: siteConfig.title,

    // Optional App Info
    appDescription: siteConfig.description,
    appUrl: siteConfig.url,
    appIcon: siteConfig.icon,
  })
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: IParentLayout) => {
  return (
    <WagmiProvider config={ckConfig}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider
          theme="soft"
          options={{
            disclaimer: (
              <>
                By connecting your wallet you agree to the{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://en.wikipedia.org/wiki/Terms_of_service">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://en.wikipedia.org/wiki/Privacy_policy">
                  Privacy Policy
                </a>
              </>
            ),
          }}>
          <AuthProvider>{children}</AuthProvider>
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
