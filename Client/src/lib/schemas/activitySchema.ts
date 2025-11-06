import { z } from "zod";

export const requiredString = (fieldName: string) =>
  z
    .string({ error: `${fieldName} is required` }) // ✅ handles undefined/null input
    .min(1, { error: `${fieldName} is required` }); // ✅ handles empty string

export const activitySchema = z.object({
  title: requiredString("Title"),
  description: requiredString("Description"),
  category: requiredString("Category"),
  date: z.coerce.date<Date>({ error: "Date is required" }),
  location: z.object({
    venue: requiredString("Venue"),
    city: z.string(),
    latitude: z.coerce.number<number>({ error: "Latitude is required" }),
    longitude: z.coerce.number<number>({ error: "Longitude is required" }),
  }),
});

export type ActivitySchema = z.infer<typeof activitySchema>;
