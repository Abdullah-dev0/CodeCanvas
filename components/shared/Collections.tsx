import { Project } from "@/types/index";
import { Suspense } from "react";
import CardComponent from "./Card";

type CollectionsProps = {
   data: Project[];
};

const Collections = async ({ data }: CollectionsProps) => {
   return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-6 md:px-4 gap-5">
         {data.map((project) => (
            <Suspense key={project.id} fallback={<div>Loading...</div>}>
               <CardComponent key={project.id} data={project} />
            </Suspense>
         ))}
      </div>
   );
};
export default Collections;
