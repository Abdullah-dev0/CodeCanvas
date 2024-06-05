import { getProjectById } from "@/actions/project.actions";
import { Button } from "@/components/ui/button";
import { Project } from "@/types";
import { MoveLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ProjectDetail = async ({ params }: { params: { id: string } }) => {
   const data = (await getProjectById(params.id)) as Project;

   return (
      <section
         className="grid lg:grid-cols-3 divide-x grid-col-1 gap-12 max-w-[1080px] mx-auto justify-center
      "
      >
         <div className="w-full px-4 flex flex-col gap-4">
            <Link href={"/"}>
               <Button variant={"ghost"} className="w-fit">
                  <MoveLeft className="mx-2" />
                  Back
               </Button>
            </Link>

            <div className="border border-gray-30 /40p-3 rounded-3xl">
               <div className="flex gap-2 items-center p-3">
                  {data.author?.image && (
                     <Image
                        src={data.author.image}
                        alt={data.author.username}
                        width={40}
                        className="rounded-full"
                        height={40}
                     />
                  )}
                  <p>{data.author?.username}</p>
               </div>
            </div>
            <h1 className="text-xl">Template</h1>
            <div className="grid grid-cols-1 divide-y leading-[3.5rem] text-lg">
               <div className="flex justify-between">
                  <h2 className="font-bold">Framework</h2>
                  <p className="text-gray-300/70">{data.framework}</p>
               </div>
               <div className="flex justify-between">
                  <h2 className="font-bold">Use Case</h2>
                  <p className="text-gray-300/70">{data.useCase}</p>
               </div>
               <div className="flex justify-between">
                  <h2 className="font-bold">Css</h2>
                  <p className="text-gray-300/70">{data.style}</p>
               </div>
            </div>
            <div className="flex gap-4 mt-3">
               <Button variant={"outline"}>
                  <Link target="_blank" href={data.githubUrl}>
                     View Code
                  </Link>
               </Button>
               <Button>
                  <Link target="_blank" href={data.websiteUrl}>
                     Live preview
                  </Link>
               </Button>
            </div>
         </div>
         <div key={data.id} className="flex flex-col gap-5 lg:col-span-2 px-5">
            <div className="relative max-w-max  mx-auto">
               <Image
                  src={data.image}
                  alt={data.name}
                  width={400}
                  loading="lazy"
                  height={200}
                  className="object-cover w-full max-h-[400px] rounded-md"
               />
            </div>
            <div
               className="prose dark:prose-invert p-3 whitespace-pre-wrap  max-w-none py-2"
               dangerouslySetInnerHTML={{
                  __html: data.description,
               }}
            />
         </div>
      </section>
   );
};

export default ProjectDetail;
