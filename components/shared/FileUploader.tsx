import { Button } from "@/components/ui/button";
import { convertFileToUrl } from "@/lib/utils";
import { useDropzone } from "@uploadthing/react/hooks";
import Image from "next/image";
import { Dispatch, SetStateAction, useCallback } from "react";
import { generateClientDropzoneAccept } from "uploadthing/client";

type FileUploaderProps = {
   onFieldChange: (urls: string[]) => void;
   imageUrls: string[];
   disabled?: boolean;
   setFiles: Dispatch<SetStateAction<File[]>>;
};

export function FileUploader({
   imageUrls,
   setFiles,
   onFieldChange,
   disabled,
}: FileUploaderProps) {
   const onDrop = useCallback(
      (acceptedFiles: File[]) => {
         const slicedFiles = acceptedFiles.slice(0, 3);
         const newUrls = slicedFiles.map((file) => convertFileToUrl(file));

         // If there are already 3 files in imageUrls, remove the first one
         if (imageUrls.length >= 3) {
            imageUrls.shift(); // Remove the first element
         }

         const updatedUrls = [...imageUrls, ...newUrls];

      

         // Update setFiles with the sliced files
        setFiles((prevFiles) => {
           if (prevFiles.length >= 3) prevFiles.shift(); // Remove the first element
           return [...prevFiles, ...slicedFiles];
        });


         onFieldChange(updatedUrls);
      },
      [imageUrls, onFieldChange, setFiles]
   );

   const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      accept: generateClientDropzoneAccept(["image/*"]),
   });

   return (
      <div className="flex flex-col gap-4 max-w-[30rem]">
         <div
            {...getRootProps()}
            className="flex-center bg-dark-3 flex cursor-pointer flex-col h-full rounded-xl bg-grey-50"
         >
            <input
               disabled={disabled}
               {...getInputProps()}
               className="cursor-pointer"
            />

            {imageUrls.length > 0 ? (
               <div className="grid grid-cols-1 self-start md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {imageUrls.map((url, index) => (
                     <div key={index} className="relative">
                        <Image
                           src={url}
                           alt={`image-${index}`}
                           width={50}
                           height={50}
                           className="w-full object-cover object-center h-full"
                        />
                     </div>
                  ))}
               </div>
            ) : (
               <div className="flex justify-center items-center flex-col py-5 text-grey-500">
                  <Image
                     src="/assets/icons/upload.svg"
                     width={77}
                     height={77}
                     alt="file upload"
                  />
                  <h3 className="mb-2 mt-2">Drag photos here</h3>
                  <p className="p-medium-12 mb-4">SVG, PNG, JPG</p>
                  <Button type="button" className="rounded-full">
                     Select from computer
                  </Button>
               </div>
            )}
         </div>
      </div>
   );
}
