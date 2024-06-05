"use client";

import { useTransition } from "react";

import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { deleteProject } from "@/actions/project.actions";
import { Trash2 } from "lucide-react";
import { usePathname } from "next/navigation";

export const DeleteConfirmation = ({ projectId }: { projectId: string }) => {
   const path = usePathname();
   let [isPending, startTransition] = useTransition();

   return (
      <AlertDialog>
         <AlertDialogTrigger>
            <Trash2 size={22} className="text-red-500" />
         </AlertDialogTrigger>

         <AlertDialogContent className="">
            <AlertDialogHeader>
               <AlertDialogTitle>
                  Are you sure you want to delete?
               </AlertDialogTitle>
               <AlertDialogDescription className="p-regular-16 text-grey-600">
                  This will permanently delete this event
               </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
               <AlertDialogCancel>Cancel</AlertDialogCancel>

               <AlertDialogAction
                  onClick={() =>
                     startTransition(async () => {
                        await deleteProject(projectId, path);
                     })
                  }
               >
                  {isPending ? "Deleting..." : "Delete"}
               </AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
};
