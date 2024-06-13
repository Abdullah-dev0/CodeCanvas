"use server";

import prisma from "@/lib/PrismaClient";
import { revalidatePath } from "next/cache";

export const addComment = async (
   projectId: string,
   userId: string,
   comment: string,
   path: string
) => {
   try {
      const newComment = await prisma.comments.create({
         data: {
            comment,
            projectId,
            authorId: userId,
         },
      });
      if (!newComment) throw new Error("Comment not added");
      revalidatePath(path);
      return newComment;
   } catch (error) {
      console.error(error);
   }
};
