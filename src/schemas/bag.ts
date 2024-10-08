import { z } from "zod";

export const addToBagSchema = z.object({
  size: z.string().min(1, {
    message: "Please select your size",
  }),
});

export type AddToBagFormValues = z.infer<typeof addToBagSchema>;
