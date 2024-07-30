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
import { toast } from "sonner";

import { deleteComment } from "@/actions/comment.action";
import { deleteProject } from "@/actions/project.actions";
import { Trash2 } from "lucide-react";
import { usePathname } from "next/navigation";
interface DeleteConfirmationProps {
	projectId?: string;
	commentId?: string;
	action: "comment" | "project";
}

export const DeleteConfirmation = ({ projectId, commentId, action }: DeleteConfirmationProps) => {
	const path = usePathname();
	let [isPending, startTransition] = useTransition();
	const [isOpen, setIsOpen] = useState(false);

	const handleSubmit = () => {
		startTransition(async () => {
			if (action === "project") {
				const response = await deleteProject(projectId!, path);
				toast(response?.error);
			}
			const response = await deleteComment(commentId!, path);
			if (response?.error) {
				toast(response.error);
			}
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
					<AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
					<AlertDialogDescription className="p-regular-16 text-grey-600">
						This will permanently delete this event.
					</AlertDialogDescription>
				</AlertDialogHeader>

				<AlertDialogFooter>
					<AlertDialogCancel onClick={() => setIsOpen(false)}>Cancel</AlertDialogCancel>

					<AlertDialogAction onClick={handleSubmit}>{isPending ? "Deleting..." : "Delete"}</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
