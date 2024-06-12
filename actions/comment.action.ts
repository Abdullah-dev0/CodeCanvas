"use server";

import prisma from "@/lib/PrismaClient";

export const addComment = async (
   projectId: string,
   userId: string,
   comment: string
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

      return newComment;
   } catch (error) {
      console.error(error);
   }
};
