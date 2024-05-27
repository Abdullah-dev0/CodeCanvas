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
         <div>
            {data.map((project) => (
               <div
                  key={project.id}
                  className="grid grid-cols-3 gap-5 justify-center"
               >
                  <div>
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
                                    height={300}
                                    className="object-cover w-full h-full"
                                 />
                              </CarouselItem>
                           ))}
                        </CarouselContent>
                     </Carousel>

                     <div className="p-6">
                        <h2 className="font-semibold text-lg">
                           {project.name}
                        </h2>
                        <div
                           className="prose dark:prose-invert pose-lg max-w-none"
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
               </div>
            ))}
         </div>
      </div>
   );
};

export default Card;
