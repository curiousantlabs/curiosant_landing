import { z } from "zod";

export const insertContactRequestSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  companyName: z.string().min(1, "Company name is required"),
  message: z.string().optional(),
});

export type InsertContactRequest = z.infer<typeof insertContactRequestSchema>;

export type ContactRequest = InsertContactRequest & {
  id: number;
  createdAt: Date;
};
