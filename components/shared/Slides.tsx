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
            {project.image.map((img) => (
               <CarouselItem key={img}>
                  <Image
                     src={img}
                     alt={project.name}
                     width={width}
                     height={height}
                     className="h-[200px] object-cover w-full"
                  />
               </CarouselItem>
            ))}
         </CarouselContent>
         {type === "description" && (
            <>
               <CarouselPrevious />
               <CarouselNext />
            </>
         )}
      </Carousel>
   );
};

export default Slides;
