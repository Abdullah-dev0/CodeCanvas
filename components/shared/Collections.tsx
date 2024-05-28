import { Project } from "@prisma/client";
import Card from "./Card";

type CollectionsProps = {
   data: Project[];
};

const Collections = ({ data }: CollectionsProps) => {
   return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-12 gap-5  ">
         {data.map((project) => (
            <Card key={project.id} data={[project]} />
         ))}
      </div>
   );
};

export default Collections;
