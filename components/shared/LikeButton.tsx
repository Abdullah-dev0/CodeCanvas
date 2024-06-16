"use client";

import { likeToggle } from "@/actions/like.actions";
import { Heart } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

interface LikeButtonProps {
  projectId: string;
  userId: string;
  totalLikes: number;
  isliked: boolean | undefined;
}

const LikeButton = ({ projectId, userId, totalLikes, isliked }: LikeButtonProps) => {
  const [like, setLike] = useState<boolean | undefined>(isliked);
  const [likes, setLikes] = useState<number>(totalLikes);
  return (
    <Button
      variant="outline"
      className="flex items-center w-fit gap-2 px-4 py-2 border border-gray-300 rounded-md"
      onClick={() => {
        setLike(!like);
        setLikes(like ? likes - 1 : likes + 1);
        likeToggle(projectId, userId).then((res) => {
          if (!res) {
            setLike(!like);
            setLikes(like ? likes - 1 : likes + 1);
          }
        });
      }}>
      <Heart size={24} className={`${like ? "text-red-700 fill-red-700" : ""}`} />
      <span className="text-lg font-semibold">{likes}</span>
      <span className="hidden sm:inline-block">Like</span>
    </Button>
  );
};

export default LikeButton;
