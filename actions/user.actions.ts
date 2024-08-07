"use server";

import prisma from "@/lib/PrismaClient";
import { User } from "@prisma/client";

export const createUser = async (data: User) => {
   if (!data)
      return new Response("No data provided to create user", { status: 400 });
   try {
      const createUser = prisma.user.create({ data });

      if (!createUser) {
         return new Response("Error occured while Creating a user ", {
            status: 400,
         });
      }

      return createUser;
   } catch (error) {
      console.log("Error creating", error);
   }
};


export const updateUser = async (data: User, id: string) => {
   try {
      const updateUser = prisma.user.update({
         where: {
            clerkId: id,
         },
         data,
      });

      return updateUser;
   } catch (error) {
      console.log("Error updating", error);
   }
};

export const deleteUser = async (id: string) => {
   if (!id) {
      return new Response("No ID provided to delete user", { status: 400 });
   }

   try {
      const deleteUser = prisma.user.delete({
         where: {
            clerkId: id,
         },
      });

      return deleteUser;
   } catch (error) {
      console.log("Error deleting", error);
   }
};

export const getUserById = async (id: string) => {
   if (!id) {
      return new Response("No ID provided to get user", { status: 400 });
   }

   try {
      const user = prisma.user.findUnique({
         where: {
            clerkId: id,
         },
      });

      if (!user) {
         return new Response("No user found", { status: 404 });
      }

      return user;
   } catch (error) {
      console.log("Error getting", error);
   }
};
