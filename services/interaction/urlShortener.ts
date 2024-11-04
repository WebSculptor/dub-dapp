import { ethereum, getContract } from ".";

export const getCurrentUser = async ({ address }: { address: string }) => {
  if (!ethereum) {
    throw new Error("Please install a browser provider");
  }

  try {
    const contract = await getContract();

    const isRegistered = await contract.checkRegisteredUser(address);

    if (!isRegistered) {
      return undefined;
    }

    const user = await contract.getUserCredentials(address);

    if (!user) {
      return undefined;
    }

    const refinedUser = {
      name: String(user[0]),
      avatar: `data:image/svg+xml;utf8,${encodeURIComponent(user[1])}`,
      owner: String(user[2]),
      workspaces: Number(user[3]),
      isRegistered: Boolean(user[4]),
      isAccountDeleted: Boolean(user[5]),
    };

    return refinedUser;
  } catch (error: any) {
    reportError(error);
    throw new Error(error.message);
  }
};

export const createAccount = async (values: {
  _username: string;
  _avatar: string;
}) => {
  if (!ethereum) {
    throw new Error("Please install a browser provider");
  }

  try {
    const contract = await getContract();

    const transaction = await contract.createAccount(
      values._username,
      values._avatar
    );
    const receipt = await transaction.wait();

    if (!receipt.status) {
      throw new Error("Transaction failed");
    }

    return receipt;
  } catch (error: any) {
    reportError(error);
    if (error.reason === "rejected") {
      throw new Error("Transaction rejected");
    } else if (error.reason === "User already registered") {
      throw new Error("You already have an account");
    } else {
      throw new Error(error.message);
    }
  }
};

export const createWorkspace = async (values: {
  _name: string;
  _slug: string;
  _cid: string;
}) => {
  if (!ethereum) {
    throw new Error("Please install a browser provider");
  }

  try {
    const contract = await getContract();

    const transaction = await contract.createWorkspace(
      values._name,
      values._slug,
      values._cid
    );
    const receipt = await transaction.wait();

    if (!receipt.status) {
      throw new Error("Transaction failed");
    }

    return receipt;
  } catch (error: any) {
    reportError(error);
    if (error.reason === "rejected") {
      throw new Error("Transaction rejected");
    } else if (error.reason === "User already registered") {
      throw new Error("You already have an account");
    } else {
      throw new Error(error.message);
    }
  }
};

export const getAllWorkspaces = async () => {
  if (!ethereum) {
    throw new Error("Please install a browser provider");
  }

  try {
    const contract = await getContract();

    const workspaces = await contract.getAllWorkspaces();

    if (!workspaces) {
      return [];
    }

    const refinedValues: IWorkspace[] = await workspaces.map((ws: any) => ({
      name: String(ws[0]),
      slug: String(ws[1]),
      cid: String(`data:image/svg+xml;utf8,${encodeURIComponent(ws[2])}`),
      links: Number(ws[3]),
      clicks: Number(ws[4]),
      createdAt: Number(ws[5]),
      isWorkspaceDeleted: Boolean(ws[6]),
    }));

    return refinedValues;
  } catch (error: any) {
    reportError(error);
    throw new Error(error.message);
  }
};
