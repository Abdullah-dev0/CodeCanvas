import { Button } from "@/components/ui/button";
import { convertFileToUrl } from "@/lib/utils";
import { useDropzone } from "@uploadthing/react/hooks";
import Image from "next/image";
import { Dispatch, SetStateAction, useCallback } from "react";
import { generateClientDropzoneAccept } from "uploadthing/client";

type FileUploaderProps = {
   onFieldChange: (url: string) => void;
   imageUrl: string;
   setFiles: Dispatch<SetStateAction<File[]>>;
   disabled: boolean;
};

export function FileUploader({
   imageUrl,
   onFieldChange,
   setFiles,
   disabled,
}: FileUploaderProps) {
   const onDrop = useCallback(
      (acceptedFiles: File[]) => {
         setFiles(acceptedFiles);
         onFieldChange(convertFileToUrl(acceptedFiles[0]));
      },
      [setFiles, onFieldChange]
   );

   const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      accept: generateClientDropzoneAccept(["image/*"]),
      disabled,
   });

   return (
      <div
         {...getRootProps()}
         className={`flex-center bg-dark-3 flex h-72 rounded-xl bg-grey-50 ${
            disabled ? "cursor-not-allowed" : "cursor-pointer"
         }`}
      >
         <input
            {...getInputProps()}
            className="cursor-pointer"
            disabled={disabled}
         />

         {imageUrl ? (
            <div className="flex h-full">
               <Image
                  src={imageUrl}
                  alt="image"
                  width={250}
                  height={250}
                  className="w-full object-cover object-center"
               />
            </div>
         ) : (
            <div className="flex-center flex-col py-5 text-grey-500">
               <Image
                  src="/assets/icons/upload.svg"
                  width={77}
                  height={77}
                  alt="file upload"
               />
               <h3 className="mb-2 mt-2">Drag photo here</h3>
               <p className="p-medium-12 mb-4">SVG, PNG, JPG</p>
               <Button
                  type="button"
                  className="rounded-full"
                  disabled={disabled}
               >
                  Select from computer
               </Button>
            </div>
         )}
      </div>
   );
}
