"use client";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const BackButton = () => {
   const router = useRouter();
   return (
      <Button
         variant={"ghost"}
         className="w-fit p-0 px-2"
         onClick={() => router.back()}
      >
         <MoveLeft className="mx-2" />
         Back
      </Button>
   );
};

export default BackButton;
