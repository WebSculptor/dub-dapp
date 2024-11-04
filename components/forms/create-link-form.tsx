"use client";

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
import CustomButton from "../shared/custom-button";
import { ICreateLink, createLinkSchema } from "@/lib/validators";
import { generateRandomString, generateSlug } from "@/lib/utils";
import { useState } from "react";
import { LuPenLine } from "react-icons/lu";
import { Loader, Shuffle, X } from "lucide-react";

export default function CreateLinkForm() {
  const [isGenerating, setIsGenerating] = useState(false);

  // 1. Define your form.
  const form = useForm<ICreateLink>({
    resolver: zodResolver(createLinkSchema),
  });

  const handleShuffleClick = () => {
    const currentShort = form.getValues("short");

    if (!currentShort) {
      setIsGenerating(true);

      // Simulate delay
      setTimeout(() => {
        const randomString = generateRandomString();
        form.setValue("short", randomString);
        setIsGenerating(false);
      }, 700); // 700ms delay for loading state
    }
  };

  // 3. Define a submit handler.
  function onSubmit(values: ICreateLink) {
    // Use existing shortLink if it exists, otherwise generate a new one
    const shortLink = values.short || generateRandomString();

    const refinedData = {
      longUrl: values.destination,
      shortUrl: shortLink,
    };

    console.log(refinedData);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6">
        <FormField
          control={form.control}
          name="destination"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-0.5 font-semibold">
                Destination URL
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="https://dub.co/help/"
                  className="h-[38px] bg-background shadow-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="short"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-0.5 font-semibold flex items-start justify-between">
                Short Link{" "}
                {isGenerating ? (
                  <Loader
                    size={14}
                    className="text-muted-foreground animate-spin"
                  />
                ) : (
                  <Shuffle
                    size={14}
                    className="cursor-pointer text-muted-foreground"
                    onClick={handleShuffleClick}
                  />
                )}
              </FormLabel>
              <FormControl>
                <div className="flex items-center">
                  <div className="h-[38px] bg-secondary/50 px-4 border border-r-0 rounded-l-md flex items-center justify-center">
                    <p className="text-sm font-medium">app.dub.co</p>
                  </div>
                  <Input
                    placeholder="(optional)"
                    className="h-[38px] bg-background shadow-none rounded-l-none read-only:cursor-not-allowed read-only:opacity-80 font-medium"
                    disabled
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <CustomButton type="submit" className="!h-10">
          Create link
        </CustomButton>
      </form>
    </Form>
  );
}
