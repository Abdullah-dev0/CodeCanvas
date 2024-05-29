"use client";
import {
   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

type SlidesProps = {
   type: "card" | "description";
   project: {
      image: string[];
      name: string;
   };
   width: number;
   height: number;
};

const Slides = ({ type, project, width, height }: SlidesProps) => {
   const autoplayPlugin = Autoplay({ delay: 2000 });

   return (
      <Carousel plugins={type === "card" ? [autoplayPlugin] : []}>
         <CarouselContent>
            {project?.image.map((img) => (
               <CarouselItem key={img}>
                  <Image
                     src={img}
                     alt={project.name}
                     width={width}
                     height={height}
                     className=" object-cover h-[200px] w-full"
                  />
               </CarouselItem>
            ))}
         </CarouselContent>
         {type === "description" && (
            <>
               <CarouselPrevious className="left-2" />
               <CarouselNext className="right-2" />
            </>
         )}
      </Carousel>
   );
};

export default Slides;
