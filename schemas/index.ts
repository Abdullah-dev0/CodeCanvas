import { z } from "zod";

export const projectSchema = z.object({
   name: z.string().min(1, "Name is required"), // name is required and must be at least 1 character
   description: z.string().min(1, "Description is required"), // description is required and must be at least 1 character
   githubUrl: z.string().url("Must be a valid URL"), // githubUrl is required and must be a valid URL
   websiteUrl: z.string().url("Must be a valid URL"), // websiteUrl is required and must be a valid URL
   author: z.string().min(1, "Author is required"), // author is required and must be at least 1 character
   authorId: z.string().min(1, "Author ID is required"), // authorId is required and must be at least 1 character
   frameworks: z.string().min(1, "Frameworks are required"), // frameworks is required and must be at least 1 character
   style: z.string().min(1, "Style is required"), // style is required and must be at least 1 character
   useCase: z.string().min(1, "Use case is required"), // useCase is required and must be at least 1 character
   image: z.string().min(1, "Image URL is required"), // image is required and must be at least 1 character
   created_At: z.number().min(1, "Creation date is required"), // created_At is required and must be at least 1 character
   updated_At: z.number().min(1, "Update date is required"), // updated_At is required and must be at least 1 character
});
