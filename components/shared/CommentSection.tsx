"use client";

import { addComment } from "@/actions/comment.action";
import { Input } from "@/components/ui/input";
import { Comment } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormMessage,
} from "../ui/form";

export const commentSchema = z.object({
   comment: z.string().min(1, "Comment is required"),
});
interface CommentSectionProps {
   projectId: string;
   userId: string;
   comments: Comment[];
}

export const CommentSection = ({
   projectId,
   userId,
   comments,
}: CommentSectionProps) => {
   const path = usePathname();
   const form = useForm<z.infer<typeof commentSchema>>({
      resolver: zodResolver(commentSchema),
      defaultValues: { comment: "" },
   });

   const onSubmit = async (data: z.infer<typeof commentSchema>) => {
      const { comment } = data;

      const newComment = await addComment(projectId, userId, comment, path);
      if (newComment) {
         form.reset();
      }
   };

   return (
      <section className="border-t max-w-screen-sm mt-8 py-8">
         <Form {...form}>
            <form
               onSubmit={form.handleSubmit(onSubmit)}
               className="flex gap-4 w-full"
            >
               <div className="w-full">
                  <FormField
                     control={form.control}
                     name="comment"
                     render={({ field }) => (
                        <FormItem className="w-full">
                           <FormControl>
                              <Input
                                 disabled={form.formState.isSubmitting}
                                 placeholder="Add a comment"
                                 type="text"
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage className="text-red-600/100 font-bold" />
                        </FormItem>
                     )}
                  />
               </div>
               <Button type="submit" disabled={form.formState.isSubmitting}>
                  Submit
               </Button>
            </form>
         </Form>
         <div className="mt-4 border p-4">
            {comments?.length > 0 ? (
               <div className="flex flex-col gap-2">
                  {comments.map((comment) => (
                     <div
                        key={comment.id}
                        className="flex gap-3 items-center w-full border border-slate-700 p-2 rounded-lg"
                     >
                        <Image
                           src={comment.author?.image ?? ""}
                           alt="user"
                           width={30}
                           height={30}
                           className="rounded-full"
                        />
                        <div className="flex gap-1 sm:justify-between w-full sm:items-center  max-sm:flex-col">
                           <p key={comment.id}>{comment.comment}</p>
                           <span className="text-[14px] leading-3">
                              {comment.createdAt.toDateString()}
                           </span>
                        </div>
                     </div>
                  ))}
               </div>
            ) : (
               <div>No comments yet.</div>
            )}
         </div>
      </section>
   );
};

export default CommentSection;
