"use server";

import prisma from "@/lib/PrismaClient";
import { revalidatePath } from "next/cache";

export const likeToggle = async (
   projectId: string,
   userId: string,
   pathname: string
) => {
   try {
      const getLikes = await prisma.like.findFirst({
         where: {
            projectId,
            authorId: userId,
         },
      });

      if (!getLikes) {
         const like = await prisma.like.create({
            data: {
               projectId,
               authorId: userId,
            },
         });

         if (!like) {
            return { error: "Error occured while liking project" };
         }
         revalidatePath(pathname);
      } else {
         const deleteLike = await prisma.like.delete({
            where: {
               id: getLikes.id,
            },
         });
         if (!deleteLike) {
            throw new Response("Error occured while unliking project");
         }
         revalidatePath(pathname);
      }
   } catch (error) {
      console.log(error);
   }
};

export const getTotalLikes = async (projectId: string) => {
   try {
      const totalLikes = await prisma.like.count({
         where: {
            projectId,
         },
      });
      if (!totalLikes) {
         throw new Response("Project not found", { status: 404 });
      }
      return totalLikes;
   } catch (error) {
      console.log(error);
   }
};
