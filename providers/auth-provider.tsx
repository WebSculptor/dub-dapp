"use client";

import NextTopLoader from "nextjs-toploader";
import { createContext, useContext, useState, useEffect } from "react";
import { useAccount, useConnect } from "wagmi";
import { Toaster } from "@/components/ui/sonner";

import { Loader } from "lucide-react";
import { usePathname } from "next/navigation";
import { getCurrentUser } from "@/services/interaction/urlShortener";

const AuthContext = createContext<IAuthContext | null>(null);

export default function AuthProvider({ children }: IParentLayout) {
  const pathname = usePathname();
  const [credentials, setCredentials] = useState<ICredential | undefined>(
    undefined
  );
  const [isFetchingUser, setIsFetchingUser] = useState(false);

  const { isConnecting, address, isConnected } = useAccount();

  const fetchCurrentUser = async () => {
    if (address) {
      try {
        setIsFetchingUser(true);
        const user = await getCurrentUser({ address: `${address}` });
        setCredentials(user);
      } catch (error) {
        console.error("Error fetching user:", error);
        setCredentials(undefined);
      } finally {
        setIsFetchingUser(false);
      }
    }
  };

  useEffect(() => {
    if (address) {
      fetchCurrentUser();
    }
  }, [address]);

  const authProps: IAuthContext = {
    credentials,
    isFetchingUser,
    address: address || "",
    isConnected,
    isConnecting,
    fetchCurrentUser,
  };

  return (
    <AuthContext.Provider value={authProps}>
      <Toaster richColors />
      <NextTopLoader showSpinner={false} color="hsl(var(--primary))" />
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
