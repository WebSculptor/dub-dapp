"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Image from "next/image";
import CreateLinkForm from "../forms/create-link-form";
import { Button } from "../ui/button";
import { useDesktopView } from "@/hooks/useDesktopView";

export default function CreateLink({ children }: IParentLayout) {
  const isDesktop = useDesktopView();

  if (isDesktop) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <div className="size-auto relative">{children}</div>
        </DialogTrigger>
        <DialogContent className="max-w-[446px] w-full rounded-2xl overflow-hidden">
          <DialogHeader>
            <DialogTitle asChild>
              <div className="py-8 border-b bg-background flex flex-col items-center justify-center">
                <Image
                  src="/svgs/dubIcon.svg"
                  alt="icon"
                  width={44}
                  height={44}
                  className="object-contain size-11 mb-2"
                />
                <h3 className="text-base md:text-lg font-semibold">
                  Create a new link
                </h3>
              </div>
            </DialogTitle>

            <div className="bg-secondary/50 py-8">
              <div className="max-w-[318px] w-full mx-auto">
                <CreateLinkForm />
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div className="size-auto relative">{children}</div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle asChild>
            <div className="py-8 border-b bg-background flex flex-col items-center justify-center gap-2">
              <Image
                src="/svgs/dubIcon.svg"
                alt="icon"
                width={44}
                height={44}
                className="object-contain size-11"
              />
              <h3 className="text-base md:text-lg font-semibold">
                Create a new workspace
              </h3>
            </div>
          </DrawerTitle>
          <div className="pt-8">
            <CreateLinkForm />
          </div>
        </DrawerHeader>
        <DrawerFooter className="pt-0">
          <DrawerClose asChild>
            <Button variant={"outline"} size={"lg"}>
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
