import prisma from "@/lib/PrismaClient";
import { User } from "@prisma/client";

export const createUser = (data: User) => {
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

export const updateUser = (data: any, id: string) => {
   try {
      const updateUser = prisma.user.update({
         where: {
            clerkId: id,
         },
         ...data,
      });

      return updateUser;
   } catch (error) {
      return null;
   }
};

export const deleteUser = (id: string) => {
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
