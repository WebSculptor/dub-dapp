import Image from "next/image";
import Wrapper from "./wrapper";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { RiExpandUpDownLine } from "react-icons/ri";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { LuPenLine } from "react-icons/lu";
import { FiLogOut } from "react-icons/fi";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/providers/auth-provider";

export default function DashboardHeader() {
  const { credentials } = useAuth();

  return (
    <header className="w-full h-16 sticky top-0 left-0 z-50 bg-background">
      <Wrapper className="flex items-center justify-between size-full">
        <div className="flex items-center gap-5 h-11">
          <Link href="/">
            <Image
              src="/svgs/dubIcon.svg"
              alt="icon"
              width={32}
              height={32}
              className="object-contain size-8"
            />
          </Link>

          <Separator orientation="vertical" className="h-8 rotate-12" />

          <Button variant={"ghost"} className="h-10 px-2 gap-2">
            <span className="size-7 rounded-full bg-foreground"></span>

            <p className="flex items-center gap-2 text-sm font-bold">
              {credentials?.name.split(" ")[0]}
            </p>

            <RiExpandUpDownLine size={16} className="ml-2" />
          </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage
                src={credentials?.avatar}
                alt={credentials?.name}
                className="object-cover"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[224px] absolute -right-5 mt-2">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuItem>
              <AiOutlineQuestionCircle size={16} className="mr-2" />
              Help Center
            </DropdownMenuItem>
            <DropdownMenuItem>
              <IoSettingsOutline size={16} className="mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LuPenLine size={16} className="mr-2" />
              Changelog
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FiLogOut size={16} className="mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Wrapper>
    </header>
  );
}
