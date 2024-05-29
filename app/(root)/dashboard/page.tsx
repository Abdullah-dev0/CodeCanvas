import { getProjectsByUserId } from "@/actions/project.actions";
import Collections from "@/components/shared/Collections";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

const Dashboard = async () => {
   const { userId } = auth();
   if (!userId) return null;
   const projects = await getProjectsByUserId(userId);
   if (!projects) return null;
   return (
      <section className="">
         <div className="flex justify-between">
            <h1 className="max-sm:text-2xl text-4xl font-medium">
               My Projects
            </h1>
            <Link href="/projects/create">
               <Button>Create Project</Button>
            </Link>
         </div>
         {projects.length > 0 ? (
            <Collections data={projects} />
         ) : (
            <div className="flex justify-center  py-28">
               <h1 className="uppercase  font-medium">
                  You have not created any projects. 😢
               </h1>
            </div>
         )}
      </section>
   );
};

export default Dashboard;
