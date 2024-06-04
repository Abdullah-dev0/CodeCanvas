import { getAllProjects } from "@/actions/project.actions";
import Collections from "@/components/shared/Collections";
import SearchTemplates from "@/components/shared/SearchTemplates";
import { SignedOut } from "@clerk/nextjs";
import Link from "next/link";

const HomePage = async () => {
   const projects = await getAllProjects();
   if (!projects) return null;

   return (
      <>
         <section className="max-lg:px-3">
            <div className="flex py-24 justify-center flex-col gap-5 text-center mx-auto max-w-[1080px]">
               <h1 className="text-5xl font-medium  capitalize max-sm:text-3xl">
                  your destination for
                  <span className="text-green-500"> developer</span> templates
               </h1>
               <p className="text-[15px] sm:text-lg text-slate-500">
                  Looking for a quick start on your next project? Welcome to
                  <span className="text-blue-400"> CodeCanvas</span> Where
                  developers like you share their expertise through a diverse
                  collection of
                  <span className="text-red-500"> templates</span>. Whether your
                  are building a
                  <span className="text-yellow-500"> website</span>&#44;
                  <span className="text-blue-400"> mobile app</span>&#44; or
                  diving into a new framework&#44; find the
                  <span className="text-purple-400"> perfect</span> starting
                  point right here.
               </p>
               <div>
                  <SignedOut>
                     <Link href="/auth/sign-in">
                        <button className="bg-gradient-to-r from-purple-800 to-pink-600 text-white font-semibold py-2 px-4 rounded-md shadow-lg max-w-none mx-auto">
                           Sign In to Share Your Templates
                        </button>
                     </Link>
                  </SignedOut>
               </div>
            </div>
         </section>

         <section className="">
            <div className="flex justify-between  items-center">
               <h1 className="text-lg font-medium">Lastest Templates</h1>
               <SearchTemplates />
            </div>

            <Collections data={projects} />
         </section>
      </>
   );
};

export default HomePage;
