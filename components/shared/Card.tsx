"use client";
import { Project } from "@prisma/client";
import Link from "next/link";
import { Button } from "../ui/button";
import Slides from "./Slides";

type CardProps = {
   data: Project[];
};

const Card = ({ data }: CardProps) => {
   return (
      <div className="shadow-lg">
         <div className="">
            {data.map((project) => (
               <div
                  key={project.id}
                  className="flex flex-col items-center"
               >
                  <Slides
                     width={200}
                     height={200}
                     type="card"
                     project={project}
                  />

                  <div className="p-6 w-full">
                     <h2 className="font-semibold text-lg mb-2">
                        {project.name}
                     </h2>
                     <div
                        className="prose dark:prose-invert prose-lg max-w-none mb-4"
                        dangerouslySetInnerHTML={{
                           __html: project.description,
                        }}
                     />
                     <div className="mt-4">
                        <Link
                           href={`/projects/${project.id}`}
                           className="text-blue-500 inline-flex items-center"
                        >
                           Learn More
                        </Link>
                     </div>
                  </div>
                  <div>
                     <Link href={`/projects/${project.id}/update`}>
                        <Button>Edit </Button>
                     </Link>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

export default Card;
