"use server";

import prisma from "@/lib/PrismaClient";
import { projectSchema } from "@/schemas";
import { User } from "@prisma/client";
import { z } from "zod";
import { getUserById } from "./user.actions";

export const uploadProject = async (
   values: z.infer<typeof projectSchema>,
   userid: string
) => {
   if (!values) {
      return { error: "No data provided" };
   }

   if (values.image.length > 3) {
      return { error: "You can only upload a maximum of 3 images" };
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
         return { error: "Error occured while creating project" };
      }
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
      const projects = await prisma.project.findMany();
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
