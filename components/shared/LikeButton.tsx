"use client";

import { likeToggle } from "@/actions/like.actions";
import { Heart } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

interface LikeButtonProps {
   projectId: string;
   userId: string;
   totalLikes: number;
}

const LikeButton = ({ projectId, userId, totalLikes }: LikeButtonProps) => {
   const pathname = usePathname();
   return (
      <Button
         variant="outline"
         className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md"
         onClick={() => likeToggle(projectId, userId, pathname)}
      >
         <Heart size={24} />
         <span className="text-lg font-semibold">{totalLikes}</span>
         <span className="hidden sm:inline-block">Like</span>
      </Button>
   );
};

export default LikeButton;
