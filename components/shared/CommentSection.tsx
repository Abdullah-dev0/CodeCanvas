"use client";

import { addComment } from "@/actions/comment.action";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Comments } from "@prisma/client";
import { useState } from "react";
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
   comments: Comments[];
}

export const CommentSection = ({
   projectId,
   userId,
   comments: initialComments,
}: CommentSectionProps) => {
   const [comments, setComments] = useState<Comments[]>(initialComments);

   const form = useForm<z.infer<typeof commentSchema>>({
      resolver: zodResolver(commentSchema),
      defaultValues: { comment: "" },
   });

   const onSubmit = async (data: z.infer<typeof commentSchema>) => {
      const { comment } = data;

      const newComment = await addComment(projectId, userId, comment);
      if (newComment) {
         form.reset();
         setComments((prevComments) => [...prevComments, newComment]);
      }
   };

   return (
      <section className="border-t w-full col-span-2 py-8">
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
         <div className="mt-4">
            {comments?.length > 0 ? (
               comments.map((comment: any) => (
                  <p key={comment.id} className="border-b py-3">
                     {comment.comment}
                  </p>
               ))
            ) : (
               <div>No comments yet.</div>
            )}
         </div>
      </section>
   );
};

export default CommentSection;
