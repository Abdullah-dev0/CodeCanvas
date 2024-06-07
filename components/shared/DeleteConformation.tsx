"use client";

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
import { useState, useTransition } from "react";

import { deleteProject } from "@/actions/project.actions";
import { Trash2 } from "lucide-react";
import { usePathname } from "next/navigation";

export const DeleteConfirmation = ({ projectId }: { projectId: string }) => {
   const path = usePathname();
   let [isPending, startTransition] = useTransition();
   const [isOpen, setIsOpen] = useState(false);

   const handleDelete = () => {
      startTransition(async () => {
         await deleteProject(projectId, path);
         setIsOpen(false);
      });
   };

   return (
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
         <AlertDialogTrigger asChild>
            <button onClick={() => setIsOpen(true)}>
               <Trash2 size={22} className="text-red-500" />
            </button>
         </AlertDialogTrigger>

         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>
                  Are you sure you want to delete?
               </AlertDialogTitle>
               <AlertDialogDescription className="p-regular-16 text-grey-600">
                  This will permanently delete this event.
               </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
               <AlertDialogCancel onClick={() => setIsOpen(false)}>
                  Cancel
               </AlertDialogCancel>

               <AlertDialogAction onClick={handleDelete}>
                  {isPending ? "Deleting..." : "Delete"}
               </AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
};
