import CustomButton from "@/components/shared/custom-button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { CornerDownRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MdContentCopy } from "react-icons/md";
import { HiOutlineCursorClick } from "react-icons/hi";
import { HiDotsHorizontal } from "react-icons/hi";
import CreateLink from "@/components/modals/create-link";

export default function WorkspaceDetailPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const links = [
    {
      shortLink: "dub.sh/react-icons",
      longLink: "react-icons.github.io/react-icons/search/#q=world",
      createdAt: "5m ago",
      clicks: 5,
    },
    {
      shortLink: "react-icons.github.io",
      longLink: "react-icons.github.io/react-icons/search/#q=world",
      createdAt: "5m ago",
      clicks: 5,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-bold">Links</h2>

        <div className="flex items-center gap-3">
          <Input
            className="h-10 w-64 bg-background focus:ring-0 focus:ring-offset-0 px-4"
            placeholder="Search..."
          />
          <CreateLink>
            <CustomButton className="!h-10 font-medium">
              Create link
            </CustomButton>
          </CreateLink>
        </div>
      </div>

      {!links ? (
        <div className="border w-full rounded-md bg-background p-12 flex flex-col items-center justify-center">
          <h2 className="text-base sm:text-lg md:text-xl font-bold text-center">
            No links found.
          </h2>

          <div className="relative -my-3 sm:-my-6 size-52 sm:size-[400px]">
            <Image
              src="/svgs/noLinks.svg"
              alt="no links yet"
              fill
              priority
              className="object-contain"
            />
          </div>

          <CustomButton className="!h-10 font-semibold" size={"lg"}>
            Create link
          </CustomButton>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {links.map((link) => (
            <div
              key={link.shortLink}
              className="w-full border bg-background transition-shadow py-[10px] px-6 rounded-2xl flex items-center justify-between h-20">
              <div className="flex items-center gap-3">
                <div className="size-9 bg-secondary rounded-full"></div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-2 h-[26px]">
                    <Link
                      target="_blank"
                      href={`https://${link.shortLink}`}
                      className="text-sm font-bold">
                      {link.shortLink}
                    </Link>

                    <CustomButton
                      className="!size-[26px] !rounded-full !p-1"
                      variant={"ghost"}>
                      <MdContentCopy size={14} />
                    </CustomButton>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground text-sm font-semibold leading-none">
                    <CornerDownRight size={12} />
                    <Link
                      target="_blank"
                      href={link.longLink}
                      className="leading-none">
                      {link.longLink}
                    </Link>

                    <Separator orientation="vertical" className="h-4 mx-3" />

                    <span className="leading-none">{link.createdAt}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Link
                  href={`/workspaces/${slug}/analytics?domain=${link.shortLink}&tab=clicks`}
                  className="h-[26px] rounded-md border bg-secondary/50 flex items-center justify-center gap-1 text-sm font-medium px-2 cursor-pointer">
                  <HiOutlineCursorClick size={15} />
                  {link.clicks} clicks
                </Link>

                <CustomButton
                  size={"icon"}
                  className="!size-8"
                  variant={"outline"}>
                  <HiDotsHorizontal size={16} />
                </CustomButton>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
