import { getProjectById } from "@/actions/project.actions";
import Slides from "@/components/shared/Slides";
import Link from "next/link";

const ProjectDetail = async ({ params }: { params: { id: string } }) => {
   const data = await getProjectById(params.id);
   if (!data) return null;

   return (
      <section className="grid lg:grid-cols-2 gap-y-12">
         <div>
            <div className="p-6 w-full">
               <h2 className="font-semibold text-lg mb-2">{data.name}</h2>

               <div className="mt-4">
                  <Link
                     href={`/projects/${data.id}`}
                     className="text-blue-500 inline-flex items-center"
                  >
                     Learn More
                  </Link>
               </div>
            </div>
         </div>
         <div key={data.id} className="flex flex-col gap-y-12 items-center">
            <div className="max-w-[450px]">
               <Slides
                  width={300}
                  height={200}
                  type="description"
                  project={data}
               />
            </div>

            <div
               className="prose dark:prose-invert bg-emerald-500 p-3 whitespace-pre-wrap  max-w-none mb-4"
               dangerouslySetInnerHTML={{
                  __html: data.description,
               }}
            />
         </div>
      </section>
   );
};

export default ProjectDetail;
