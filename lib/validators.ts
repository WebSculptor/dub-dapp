import { z } from "zod";

const authSchema = z.object({
  name: z.string().min(2).max(32),
  address: z.string(),
  avatar: z.string().optional(),
});

const createWorkspaceSchema = z.object({
  name: z.string().min(2).max(32),
  slug: z.string(),
});

const createLinkSchema = z.object({
  destination: z.string().min(2),
  short: z.string().optional(),
});

type CreateLinkType = z.infer<typeof createLinkSchema>;

interface ICreateLink extends CreateLinkType {}

export {
  authSchema,
  createWorkspaceSchema,
  createLinkSchema,
  type ICreateLink,
};
