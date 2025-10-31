import { z } from "zod";

const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLocaleLowerCase();
};

const requiredString = (fieldName: string) => {
  return z.string().nonempty(`${capitalizeFirstLetter(fieldName)} is required`);
};

export const activitySchema = z.object({
  title: requiredString("title"),
  description: requiredString("description"),
  category: requiredString("category"),
  date: requiredString("date"),
  city: requiredString("city"),
  venue: requiredString("venue"),
});

export type ActivitySchema = z.infer<typeof activitySchema>;
