"use server";

import prisma from "@/lib/PrismaClient";
import { projectSchema } from "@/schemas";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getUserById } from "./user.actions";

export const uploadProject = async (
   values: z.infer<typeof projectSchema>,
   userid: string,
   pathname: string
) => {
   if (!values) {
      console.log("no value Provided");
   }

   try {
      const getCurrentUser = (await getUserById(userid)) as User;

      if (!getCurrentUser) {
         return { error: "User not found" };
      }

      const project = await prisma.project.create({
         data: {
            ...values,
            authorId: getCurrentUser?.id,
         },
      });

      if (!project) {
         return { error: "Error occured while creating project" };
      }
      revalidatePath(pathname);
      return { success: "Project created successfully", project };
   } catch (error: any) {
      console.log(error);
   }
};

export const getProjectById = async (id: string, userId: string) => {
   try {
      const project = await prisma.project.findUnique({
         where: {
            id,
         },
         include: {
            author: {
               select: {
                  username: true,
                  image: true,
                  id: true,
               },
            },
            _count: {
               select: {
                  Like: true,
               },
            },
            Like: {
               where: {
                  authorId: userId,
                  projectId: id,
               },
            },
         },
      });

      if (!project) {
         console.log("Project not found");
         return null;
      }

      const likedByCurrentUser = project.Like.length > 0;

      return {
         ...project,
         likedByCurrentUser,
      };
   } catch (error: any) {
      console.log(error);
      return null;
   }
};

export const getAllProjects = async () => {
   try {
      const projects = await prisma.project.findMany({
         include: {
            author: {
               select: {
                  username: true,
                  image: true,
               },
            },
         },
      });

      if (!projects) {
         console.log("No projects found");
      }

      return projects;
   } catch (error) {
      console.log(error);
   }
};

export const updateProject = async (
   values: z.infer<typeof projectSchema>,
   id: string
) => {
   try {
      const updateProject = await prisma.project.update({
         where: {
            id,
         },
         data: {
            ...values,
         },
      });
      if (!updateProject) {
         return { error: "Error occured while updating project" };
      }

      return { success: "Project updated successfully", updateProject };
   } catch (error) {
      console.log(error);
   }
};

export const getProjectsByUserId = async (id: string) => {
   try {
      const user = (await getUserById(id)) as User;

      if (!user) throw new Response("User not found");

      const projects = await prisma.project.findMany({
         where: {
            authorId: user.id,
         },
         include: {
            author: {
               select: {
                  username: true,
                  image: true,
               },
            },
         },
      });

      if (!projects) {
         throw new Response(
            "No projects found or there was an error fetching projects"
         );
      }

      return projects;
   } catch (error) {
      console.log(error);
   }
};

export const deleteProject = async (id: string, path: string) => {
   try {
      const project = await prisma.project.delete({
         where: {
            id,
         },
      });

      if (!project) {
         return { error: "Error occured while deleting project" };
      }
      revalidatePath(path);
      return { success: "Project deleted successfully", project };
   } catch (error) {
      console.log(error);
   }
};
