import { Project } from "@prisma/client";
import Link from "next/link";
import { Button } from "../ui/button";
import Slides from "./Slides";

type CardProps = {
   data: Project;
};

const Card = ({ data }: CardProps) => {
   return (
      <div className="shadow-lg">
         <div className="">
            <div key={data.id} className="flex flex-col items-center">
               <Slides width={200} height={200} type="card" project={data} />
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
               <div>
                  <Link href={`/projects/${data.id}/update`}>
                     <Button>Edit </Button>
                  </Link>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Card;
