"use client";

import Image from "next/image";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authSchema } from "@/lib/validators";
import { useEffect, useState } from "react";
import { LuPenLine } from "react-icons/lu";
import { Loader } from "lucide-react";
import CustomConnectButton from "@/components/shared/connect-button";
import CustomButton from "@/components/shared/custom-button";
import { useAccount } from "wagmi";
import { z } from "zod";
import { createAvatar } from "@dicebear/core";
import { initials } from "@dicebear/collection";
import { createAccount } from "@/services/interaction/urlShortener";
import { toast } from "sonner";
import { useAuth } from "@/providers/auth-provider";

export default function LoginPage() {
  const { address, isConnecting, isConnected } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
  });

  // 3. Define a submit handler.
  async function onSubmit(values: z.infer<typeof authSchema>) {
    const avatar = createAvatar(initials, {
      seed: values.name,
    }).toString();

    const refinedValues = {
      _username: values.name,
      _avatar: avatar,
    };

    try {
      setIsLoading(true);
      const data = await createAccount(refinedValues);
      if (data) {
        console.log("Account created");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (address) {
      form.setValue("address", `${address}`);
    }
  }, [address]);

  return (
    <div className="flex flex-col items-center gap-4">
      <Image
        src="/svgs/dub.svg"
        alt="dub"
        width={92}
        height={48}
        className="mb-4"
      />

      <div className="w-full border rounded-2xl overflow-hidden">
        <div className="bg-background border-b h-[85px] flex items-center justify-center">
          <h4 className="text-base sm:text-lg font-bold">
            Sign in to your Dub account
          </h4>
        </div>

        <div className="bg-secondary/50 py-8">
          <div className="max-w-[318px] w-full mx-auto flex flex-col">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-6">
                <FormField
                  disabled={isLoading || !address}
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mb-0.5 font-semibold">
                        Username
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Web Sculptor"
                          className="h-10 bg-background shadow-none"
                          type="text"
                          disabled={isLoading || !address}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  disabled={isLoading || !address}
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mb-0.5 font-semibold flex items-start justify-between">
                        Wallet Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="0x123...7890"
                          className="h-10 bg-background font-medium shadow-none"
                          type="text"
                          disabled={true}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <CustomButton
                  type="submit"
                  className="!h-10"
                  disabled={isLoading || !address}>
                  {isLoading ? (
                    <>
                      <Loader size={16} className="mr-2 animate-spin" /> Please
                      wait...
                    </>
                  ) : (
                    "Continue"
                  )}
                </CustomButton>
              </form>
            </Form>

            <p className="flex items-center gap-4 my-6">
              <span className="flex-1 h-px bg-primary/50" />
              <span className="text-sm font-medium">
                Wallet address is required
              </span>
              <span className="flex-1 h-px bg-primary/50" />
            </p>

            <CustomConnectButton />
          </div>
        </div>
      </div>
    </div>
  );
}
