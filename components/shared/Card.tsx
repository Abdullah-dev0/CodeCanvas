"use client";
import {
   Carousel,
   CarouselContent,
   CarouselItem,
} from "@/components/ui/carousel";
import { Project } from "@prisma/client";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";

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
                  className="flex flex-col items-center w-full"
               >
                  <Carousel
                     plugins={[
                        Autoplay({
                           delay: 2000,
                        }),
                     ]}
                  >
                     <CarouselContent>
                        {project.image.map((img) => (
                           <CarouselItem key={img}>
                              <Image
                                 src={img}
                                 alt={project.name}
                                  width={500}
                                  height={500}
                              />
                           </CarouselItem>
                        ))}
                     </CarouselContent>
                  </Carousel>

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
               </div>
            ))}
         </div>
      </div>
   );
};

export default Card;
