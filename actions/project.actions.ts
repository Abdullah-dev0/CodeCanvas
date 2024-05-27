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
      const getcurrentUser = (await getUserById(userid)) as User;

      if (!getcurrentUser) {
         return { error: "User not found" };
      }

      const project = await prisma.project.create({
         data: {
            ...values,
            authorId: getcurrentUser?.id,
         },
      });

      if (!project) {
         return { error: "Error occured while creating project" };
      }
   } catch (error: any) {
      console.log(error);
   }
};
