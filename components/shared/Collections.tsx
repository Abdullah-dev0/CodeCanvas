import { getUserById } from "@/actions/user.actions";
import { Project } from "@/types/index";
import { auth } from "@clerk/nextjs/server";
import { User } from "@prisma/client";
import CardComponent from "./Card";

type CollectionsProps = {
   data: Project[];
};

const Collections = async ({ data }: CollectionsProps) => {
   const { userId } = auth();
   const getCurrentUser = (await getUserById(userId!)) as User;

   return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-6 md:px-4 gap-5">
         {data.map((project) => (
            <CardComponent
               key={project.id}
               userId={getCurrentUser?.id}
               data={project}
            />
         ))}
      </div>
   );
};
export default Collections;
