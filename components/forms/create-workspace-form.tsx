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
import { createWorkspaceSchema } from "@/lib/validators";
import { generateSlug } from "@/lib/utils";
import { useState } from "react";
import { LuPenLine } from "react-icons/lu";
import { Loader, X } from "lucide-react";
import { createAvatar } from "@dicebear/core";
import { glass } from "@dicebear/collection";
import { useAsyncHandler } from "@/hooks/useFetch";
import { createWorkspace } from "@/services/interaction/urlShortener";
import { z } from "zod";
import { toast } from "sonner";

export default function CreateWorkspaceForm() {
  const [shouldNotModify, setShouldNotModify] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof createWorkspaceSchema>>({
    resolver: zodResolver(createWorkspaceSchema),
  });

  // 2. Handle the name field change to update the slug field.
  const handleNameChange = (name: string) => {
    form.setValue("slug", generateSlug(name));
  };

  // 3. Define a submit handler.
  async function onSubmit(values: z.infer<typeof createWorkspaceSchema>) {
    if (!values.slug) {
      form.setError("slug", {
        message: "Workspace Slug is required!",
      });
      return;
    }

    const cid = createAvatar(glass, {
      seed: `${values.name} - ${Date.now()}`,
    }).toString();

    const refinedValues = {
      _name: values.name,
      _slug: values.slug,
      _cid: cid,
    };
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      setIsLoading(true);
      const workspace = await createWorkspace(refinedValues);
      if (workspace) {
        toast.success("Workspace created successfully");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6">
        <FormField
          control={form.control}
          disabled={isLoading}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-0.5 font-semibold">
                Workspace Name
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Acme, Inc."
                  className="h-[38px] bg-background shadow-none"
                  {...field}
                  disabled={isLoading}
                  onChange={(e) => {
                    field.onChange(e);
                    handleNameChange(e.target.value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          disabled={isLoading}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-0.5 font-semibold flex items-start justify-between">
                {shouldNotModify ? (
                  <>
                    Workspace Slug
                    <LuPenLine
                      size={14}
                      onClick={() => setShouldNotModify(false)}
                      className="cursor-pointer"
                    />
                  </>
                ) : (
                  <>
                    Customize Slug
                    <X
                      size={14}
                      onClick={() => setShouldNotModify(true)}
                      className="cursor-pointer"
                    />
                  </>
                )}
              </FormLabel>
              <FormControl>
                <div className="flex items-center">
                  <div className="h-[38px] bg-secondary/50 px-4 border border-r-0 rounded-l-md flex items-center justify-center">
                    <p className="text-sm font-medium">app.dub.co</p>
                  </div>
                  <Input
                    placeholder="acme"
                    className="h-[38px] bg-background shadow-none rounded-l-none read-only:cursor-not-allowed read-only:opacity-80"
                    disabled={isLoading}
                    readOnly={shouldNotModify}
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <CustomButton type="submit" className="!h-10" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader className="mr-2 animate-spin" size={16} /> Please wait...
            </>
          ) : (
            "Create workspace"
          )}
        </CustomButton>
      </form>
    </Form>
  );
}
