"use client";

import { ConnectKitButton } from "connectkit";
import CustomButton from "./custom-button";
import { Loader } from "lucide-react";
import { truncate } from "@/lib/utils";

export default function CustomConnectButton() {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, isConnecting, show, address }) => {
        return (
          <CustomButton
            onClick={show}
            className="!h-10"
            disabled={isConnecting}
            variant={"outline"}>
            {isConnecting ? (
              <>
                <Loader className="animate-spin mr-2" size={16} /> Connecting...
              </>
            ) : isConnected ? (
              truncate(`${address}`)
            ) : (
              "Connect Wallet"
            )}
          </CustomButton>
        );
      }}
    </ConnectKitButton.Custom>
  );
}
