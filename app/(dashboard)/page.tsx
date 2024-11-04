"use client";

import Wrapper from "@/components/shared/wrapper";
import Image from "next/image";
import CustomButton from "@/components/shared/custom-button";
import CreateWorkspace from "@/components/modals/create-workspace";
import Link from "next/link";
import { TiWorldOutline } from "react-icons/ti";
import { ChartNoAxesColumn, Globe, Link2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAsyncHandler } from "@/hooks/useFetch";
import { getAllWorkspaces } from "@/services/interaction/urlShortener";
import { useEffect } from "react";
import { getContract } from "@/services/interaction";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

export default function WorkspacesPage() {
  const router = useRouter();

  const {
    fn: getAllWorkspacesFn,
    isLoading,
    data: workspaces,
  }: IAsyncHandlerHook = useAsyncHandler(getAllWorkspaces);

  useEffect(() => {
    getAllWorkspacesFn();

    (async () => {
      const contract = await getContract();

      // TicketPurchased event listener
      contract.on(
        "WorkspaceCreated",
        async (userAddress, workspaceName, workspaceSlug) => {
          getAllWorkspacesFn();
        }
      );

      return () => {
        contract.removeAllListeners("WorkspaceCreated");
      };
    })();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="w-full h-24 sm:h-36 bg-background border-y">
        <Wrapper className="flex items-center justify-between size-full">
          <h1 className="text-xl md:text-2xl font-medium">My Workspaces</h1>

          <CreateWorkspace>
            <CustomButton className="!h-10 font-semibold">
              Create workspace
            </CustomButton>
          </CreateWorkspace>
        </Wrapper>
      </div>

      <Wrapper className="my-8 px-4 w-full">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 9 }).map((_, _key) => (
              <Skeleton
                key={_key}
                className="rounded-md w-full bg-background h-36 border"
              />
            ))}
          </div>
        ) : !workspaces ? (
          <div className="border w-full rounded-md bg-background p-12 flex flex-col items-center justify-center">
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-center">
              You don't have any workspaces yet!
            </h2>

            <div className="relative -my-3 sm:-my-6 size-52 sm:size-[400px]">
              <Image
                src="/svgs/noWorkspace.svg"
                alt="no work yet"
                fill
                priority
                className="object-contain"
              />
            </div>

            <CreateWorkspace>
              <CustomButton className="!h-10 font-semibold" size={"lg"}>
                Create workspace
              </CustomButton>
            </CreateWorkspace>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workspaces.map((ws: IWorkspace, index: number) => (
              <Link
                href={`/workspaces/${ws.slug}`}
                key={index}
                className="border rounded-md w-full bg-background shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col gap-8 h-36">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={ws.cid} alt={ws.name} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col">
                      <h4 className="text-base sm:text-lg font-bold leading-none">
                        {ws.name}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-none">
                        {ws.slug}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-full bg-foreground text-xs py-0.5 px-2 text-background font-bold">
                    Free
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  {/* <p className="flex items-center gap-1.5 text-sm text-muted-foreground font-semibold">
                    <Globe size={17} />
                    {ws.domains} domains
                  </p> */}
                  <p className="flex items-center gap-1.5 text-sm text-muted-foreground font-semibold">
                    <Link2 size={18} />
                    {ws.links} links
                  </p>
                  <p className="flex items-center gap-1.5 text-sm text-muted-foreground font-semibold">
                    <ChartNoAxesColumn size={18} />
                    {ws.clicks} clicks
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Wrapper>
    </div>
  );
}
