import { z } from "zod";

export const projectSchema = z.object({
   name: z
      .string()
      .min(3, "Name is required and must be at least 3 characters"), // name is required and must be at least 3 characters
   description: z
      .string()
      .min(3, "Description is required and must be at least 3 characters")
      .max(2000, "Description must not exceed 2000 characters"), // description constraints
   githubUrl: z
      .string()
      .url("Must be a valid URL")
      .min(3, "Github URL is required and must be at least 3 characters"), // githubUrl constraints
   websiteUrl: z.string().url("Must be a valid URL"), // websiteUrl constraints
   framework: z.string().min(1, "Framework is required"), // framework constraints
   style: z.string().min(1, "Style is required"), // style is optional
   useCase: z.string().min(1, "usecase is required"), // useCase is optional
   image: z
      .array(z.string().url("Each image must be a valid URL"))
      .min(3, "At least 3 image URL is required"), // image is an array of valid URLs// image is an array of valid URLs
});
