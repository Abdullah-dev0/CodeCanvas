import { Project } from "@prisma/client";
import Card from "./Card";

type CollectionsProps = {
   data: Project[];
};

const Collections = ({ data }: CollectionsProps) => {
   return (
      <div className="grid grid-cols-3 mt-12 max-w-screen-lg self-center mx-auto">
         {data.map((project) => (
            <Card key={project.id} data={[project]} />
         ))}
      </div>
   );
};

export default Collections;
