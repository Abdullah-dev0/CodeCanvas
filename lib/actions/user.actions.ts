import prisma from "@/lib/PrismaClient";
import { User } from "@prisma/client";

export const createUser = (user: User) => {
   console.log("User created:", user);

   if (!user.id) {
      return new Response("Error creating user -- no id provided");
   }

   try {
      const createUser = prisma.user.create({
         data: user,
      });

      if (!createUser) {
         return new Response("Error occured while Creating a user ", {});
      }
      return JSON.parse(JSON.stringify(createUser));
   } catch (error) {
      console.log("Error creating user", error);
   }
};

export const updateUser = (user: any, id: string) => {
   console.log("User updated:", user);
   if (!user.id || !user.emailAddresses[0].emailAddress) {
      console.error("Error updating user");
      return;
   }

   const updateUser = prisma.user.update({
      where: {
         clerkId: id,
      },
      data: {
         ...user,
      },
   });

   if (!updateUser) {
      console.error("Error updating user");
      return;
   }

   return JSON.parse(JSON.stringify(updateUser));
};

export const deleteUser = (id: string) => {
   console.log("User deleted:", id);
   if (!id) {
      console.error("NO id provided to delete user");
      return;
   }

   const deleteUser = prisma.user.delete({
      where: {
         clerkId: id,
      },
   });

   if (!deleteUser) {
      console.error("Error deleting user");
      return;
   }

   return JSON.parse(JSON.stringify(deleteUser));
};
