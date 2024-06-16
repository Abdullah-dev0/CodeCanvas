"use server";

import prisma from "@/lib/PrismaClient";
import { revalidatePath } from "next/cache";

export const likeToggle = async (projectId: string, userId: string) => {
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
    } else {
      const deleteLike = await prisma.like.delete({
        where: {
          id: getLikes.id,
        },
      });
      if (!deleteLike) {
        throw new Response("Error occured while unliking project");
      }
    }
  } catch (error) {
    console.log(error);
  }
};
