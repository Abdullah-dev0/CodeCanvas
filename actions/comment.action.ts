"use server";

import prisma from "@/lib/PrismaClient";
import { revalidatePath } from "next/cache";
import { comment } from "postcss";

export const addComment = async (projectId: string, userId: string, comment: string, path: string) => {
  try {
    const newComment = await prisma.comments.create({
      data: {
        comment,
        projectId,
        authorId: userId,
      },
      include: {
        author: {
          select: {
            username: true,
            image: true,
            id: true,
          },
        },
      },
    });
    if (!newComment) throw new Error("Comment not added");
    revalidatePath(path);
    return newComment;
  } catch (error) {
    console.error(error);
  }
};

export const getCommentsByProjectId = async (projectId: string, skip: number, take: number) => {
  try {
    const comments = await prisma.comments.findMany({
      where: {
        projectId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            username: true,
            image: true,
            id: true,
          },
        },
      },
      skip: skip,
      take: take,
    });
    if (!comments) throw new Error("No comments found");

    const totalComments = await prisma.comments.count({
      where: {
        projectId,
      },
    });
    return {
      comments,
      totalComments,
    };
  } catch (error) {
    console.log(error);
  }
};
