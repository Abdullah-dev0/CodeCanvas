"use client";

import { addComment } from "@/actions/comment.action";
import { Input } from "@/components/ui/input";
import { Comment } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import Pagination from "./Pagination";

export const commentSchema = z.object({
  comment: z.string().min(1, "Comment is required"),
});

interface CommentSectionProps {
  projectId: string;
  userId: string;
  comments: any;
  page?: number;
  totalPages?: number;
}

export const CommentSection = ({ projectId, userId, comments, page, totalPages }: CommentSectionProps) => {
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
    } else {
      console.log("There was an error adding the comment");
    }
  };

  return (
    <section className="border-t mt-8 py-8 max-w-screen-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-4 w-full">
          <div className="w-full">
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input disabled={form.formState.isSubmitting} placeholder="Add a comment" type="text" {...field} />
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
          <div className="flex flex-col gap-9">
            {comments.map((comment: any) => (
              <div key={comment.id} className="flex transition-all duration-300  gap-3 items-center w-full">
                <Image src={comment.author?.image ?? ""} alt="user" width={30} height={30} className="rounded-full" />
                <div className="flex gap-1 sm:justify-between w-full sm:items-center  max-sm:flex-col">
                  <p key={comment.id}>{comment.comment}</p>
                  <span className="text-[13px] leading-3">{comment.createdAt.toDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>No comments yet.</div>
        )}
      </div>
      <Pagination page={page} totalPages={totalPages} />
    </section>
  );
};

export default CommentSection;
