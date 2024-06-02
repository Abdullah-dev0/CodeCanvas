"use server";

import prisma from "@/lib/PrismaClient";
import { projectSchema } from "@/schemas";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getUserById } from "./user.actions";

export const uploadProject = async (
   values: z.infer<typeof projectSchema>,
   userid: string
) => {
   if (!values) {
      console.log("no value Provided");
   }

   if (values.image.length > 3) {
      console.log(" cannot upload more then 3 images  ");
   }

   try {
      const getCurrentUser = (await getUserById(userid)) as User;

      if (!getCurrentUser) {
         return null;
      }

      const project = await prisma.project.create({
         data: {
            ...values,
            authorId: getCurrentUser?.id,
         },
      });

      if (!project) {
         console.log("Error occured while creating project");
      }
      revalidatePath("/");
      return project;
   } catch (error: any) {
      console.log(error);
   }
};

export const getProjectById = async (id: string) => {
   try {
      const project = await prisma.project.findUnique({
         where: {
            id,
         },
      });

      if (!project) {
         console.log("Project not found");
      }
      return project;
   } catch (error: any) {
      console.log(error);
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
   } catch (error) {
      console.log(error);
   }
};

export const getProjectsByUserId = async (id: string) => {
   try {
      const user = (await getUserById(id)) as User;

      if (!user) return null;

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
         console.log("No projects found");
      }

      return projects;
   } catch (error) {
      console.log(error);
   }
};
