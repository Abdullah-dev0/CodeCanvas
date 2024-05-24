import prisma from "@/prisma/PrismaClient";
// import { User } from "@clerk/nextjs/server";

export const createUser = (user: any) => {
   console.log("User created:", user);
   if (!user.id || !user.emailAddresses[0].emailAddress) {
      console.error("Error creating user");
      return;
   }

   const createUser = prisma.user.create({
      data: {
         ...user,
      },
   });

   if (!createUser) {
      console.error("Error creating user");
      return;
   }

   return createUser;
};
