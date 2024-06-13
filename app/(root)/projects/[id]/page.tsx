import { getProjectAndLikesById } from "@/actions/project.actions";
import { getUserById } from "@/actions/user.actions";
import BackButton from "@/components/shared/Back";
import CommentSection from "@/components/shared/CommentSection";
import LikeButton from "@/components/shared/LikeButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ProjectWithLikesAndUserLike } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

const ProjectDetail = async ({ params }: { params: { id: string } }) => {
   const { userId } = auth();
   const user = (await getUserById(userId!)) as User;
   const data = (await getProjectAndLikesById(
      params.id,
      user.id
   )) as ProjectWithLikesAndUserLike;

   return (
      <>
         <section
            className="grid lg:grid-cols-3 md:divide-x-reverse grid-col-1 gap-12 max-w-[1080px] mx-auto justify-center items-center 
      "
         >
            <div className="w-full px-4 flex flex-col gap-4">
               <BackButton />
               <LikeButton
                  projectId={data.id}
                  totalLikes={data._count.Like}
                  userId={user.id}
                  isliked={data.likedByCurrentUser}
               />

               <div className="border border-gray-30 /40p-3 rounded-3xl">
                  <div className="flex gap-2 items-center p-3">
                     {data.author?.image ? (
                        <Image
                           src={data.author.image || ""}
                           alt={data.author.username}
                           width={40}
                           className="rounded-full object-cover"
                           height={40}
                        />
                     ) : (
                        <Avatar>
                           <AvatarImage src="https://github.com/shadcn.png" />
                           <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                     )}
                     <p>{data.author?.username}</p>
                  </div>
               </div>
               <h1 className="text-xl">Template</h1>

               <div className="grid grid-cols-1 divide-y leading-[3.5rem] text-lg">
                  <div className="flex justify-between">
                     <h2 className="font-bold">Framework</h2>
                     <p className="dark:text-gray-300/70">{data.framework}</p>
                  </div>
                  <div className="flex justify-between">
                     <h2 className="font-bold">Use Case</h2>
                     <p className="dark:text-gray-300/70">{data.useCase}</p>
                  </div>
                  <div className="flex justify-between">
                     <h2 className="font-bold">Css</h2>
                     <p className="dark:text-gray-300/70">{data.style}</p>
                  </div>
               </div>
               <div className="flex gap-4 mt-3">
                  <Button variant={"outline"}>
                     <Link target="_blank" href={data.githubUrl}>
                        View Code
                     </Link>
                  </Button>
                  <Button>
                     <Link target="_blank" href={data.websiteUrl}>
                        Live preview
                     </Link>
                  </Button>
               </div>
            </div>
            <div
               key={data.id}
               className="flex flex-col gap-5 lg:col-span-2 px-5"
            >
               <div className="relative max-w-max  mx-auto">
                  <Image
                     src={data.image}
                     alt={data.name}
                     width={400}
                     loading="lazy"
                     height={200}
                     className="object-cover w-full max-h-[400px] rounded-md"
                  />
               </div>
               <div
                  className="prose dark:prose-invert p-3 whitespace-pre-wrap  max-w-none py-2"
                  dangerouslySetInnerHTML={{
                     __html: data.description,
                  }}
               />
            </div>
         </section>
         <CommentSection
            comments={data.Comments}
            projectId={data.id}
            userId={user.id}
         />
      </>
   );
};

export default ProjectDetail;
