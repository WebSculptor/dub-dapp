declare type TNode = React.ReactNode;

declare interface IParentLayout {
  children: TNode;
}

declare interface ISiteConfig {
  title: string;
  slogan?: string;
  description: string;
  icon: any;
  url?: string;
}

declare interface IAuthContext {
  credentials: ICredential | undefined;
  isFetchingUser: boolean;
  address: string | undefined;
  isConnected: boolean;
  isConnecting: boolean;
  fetchCurrentUser: () => void;
}

declare interface IWrapper {
  children: TNode;
  className?: string;
}

declare interface ICustomButton {
  children: TNode;
  className?: string;
  variant?:
    | "link"
    | "outline"
    | "default"
    | "destructive"
    | "secondary"
    | "ghost"
    | null
    | undefined;
  size?: "default" | "sm" | "lg" | "icon" | null | undefined;
  type?: "submit" | "button" | "reset";
  onClick?: () => void;
  disabled?: boolean;
}

declare interface IAsyncHandlerHook {
  data?: any;
  isLoading?: boolean | null | undefined | any;
  isError?: string | null | any;
  fn: (...args: any) => Promise<boolean>;
}

declare interface ICredential {
  name: string;
  avatar: string;
  owner: string;
  workspaces: number;
  isRegistered: boolean;
  isAccountDeleted: boolean;
}

declare interface IWorkspace {
  name: string;
  slug: string;
  cid: string;
  links: number;
  clicks: number;
  createdAt: number;
  isWorkspaceDeleted: boolean;
}

declare interface ILink {
  shortCode: string;
  longUrl: string;
  clicks: number;
  createdAt: number;
  sharable: boolean;
  isLinkDeleted: boolean;
}
