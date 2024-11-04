import { cn } from "@/lib/utils";

export default function Wrapper(props: IWrapper) {
  return (
    <div className={cn("mx-auto max-w-[1136px] px-4", props.className)}>
      {props.children}
    </div>
  );
}
