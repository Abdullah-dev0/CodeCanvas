"use client";
import { updateProject, uploadProject } from "@/actions/project.actions";
import SelectOptions from "@/components/shared/SelectOption";
import { Button } from "@/components/ui/button";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { projectDefaultValues } from "@/constant";
import { useUploadThing } from "@/lib/uploadthing";
import { cleanHtmlContent } from "@/lib/utils";
import { projectSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Project } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { FileUploader } from "./FileUploader";
import TextEditor from "./TextEditor";

type ProjectFormProps = {
   userId: string;
   type: "Create" | "Update";
   data?: Project;
};

const CreateForm = ({ userId, type, data }: ProjectFormProps) => {
   const [files, setFiles] = useState<File[]>([]);
   const [error, setError] = useState<string | undefined>("");
   const { startUpload } = useUploadThing("imageUploader");
   const initialValues = projectDefaultValues;
   const router = useRouter();

   const form = useForm<z.infer<typeof projectSchema>>({
      resolver: zodResolver(projectSchema),
      defaultValues: data ? data : initialValues,
   });

   const { dirtyFields } = form.formState;

   async function onSubmit(values: z.infer<typeof projectSchema>) {
      const clean = cleanHtmlContent(values.description);
      let uploadedImageUrl = values.image;

      if (files.length > 0) {
         const uploadedImages = await startUpload(files);

         if (!uploadedImages) {
            return;
         }

         uploadedImageUrl = uploadedImages[0].url;
      }

      if (type === "Create") {
         setError("");
         const newProject = await uploadProject(
            { ...values, image: uploadedImageUrl, description: clean },
            userId
         );

         if (!newProject) return null;

         if (newProject) {
            router.push(`/projects/${newProject.id}`);
            form.reset();
         }
      } else {
         if (Object.values(dirtyFields).length === 0) {
            setError("No changes made to the project");
            return;
         }
         const updatedValues = { ...values, description: clean };

         setError("");
         updateProject(updatedValues, data!.id).then((res) => {
            setError(res?.error);
            if (!res?.error) {
               router.push(`/projects/${data!.id}`);
               form.reset();
            }
         });
      }
   }

   return (
      <Card className="w-full mb-10">
         <CardHeader>
            <CardTitle>Create project</CardTitle>
            <CardDescription>
               Deploy your new project in one-click.
            </CardDescription>
         </CardHeader>
         <CardContent>
            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col gap-4 w-full"
               >
                  <div className="flex-col flex gap-4 md:flex-row">
                     <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                           <FormItem className="w-full">
                              <FormLabel>Project Name</FormLabel>
                              <FormControl>
                                 <Input
                                    disabled={form.formState.isSubmitting}
                                    placeholder="codecanvas"
                                    type="text"
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage className="text-red-600/100 font-bold" />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="githubUrl"
                        render={({ field }) => (
                           <FormItem className="w-full">
                              <FormLabel>Github url</FormLabel>
                              <FormControl>
                                 <Input
                                    type="url"
                                    disabled={form.formState.isSubmitting}
                                    placeholder="https://google.com"
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage className="text-red-600/100 font-bold" />
                           </FormItem>
                        )}
                     />
                  </div>
                  <div className="flex-col flex gap-4 md:flex-row">
                     <FormField
                        control={form.control}
                        name="websiteUrl"
                        render={({ field }) => (
                           <FormItem className="w-full">
                              <FormLabel>Website Url</FormLabel>
                              <FormControl>
                                 <Input
                                    type="url"
                                    disabled={form.formState.isSubmitting}
                                    placeholder="https://google.com"
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage className="text-red-600/100 font-bold" />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="style"
                        render={({ field }) => (
                           <FormItem className="w-full">
                              <FormLabel>Style</FormLabel>
                              <FormControl>
                                 <SelectOptions
                                    state={form.formState.isSubmitting}
                                    type="style"
                                    value={field.value}
                                    onChangeHandler={field.onChange}
                                    placeholder="Select style"
                                 />
                              </FormControl>
                              <FormMessage className="text-red-600/100 font-bold" />
                           </FormItem>
                        )}
                     />
                  </div>
                  <div className="flex-col flex gap-4 md:flex-row">
                     <FormField
                        control={form.control}
                        name="framework"
                        render={({ field }) => (
                           <FormItem className="w-full">
                              <FormLabel>Framework</FormLabel>
                              <FormControl>
                                 <SelectOptions
                                    state={form.formState.isSubmitting}
                                    type="framework"
                                    value={field.value}
                                    onChangeHandler={field.onChange}
                                    placeholder="Select framework"
                                 />
                              </FormControl>
                              <FormMessage className="text-red-600/100 font-bold" />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="useCase"
                        render={({ field }) => (
                           <FormItem className="w-full">
                              <FormLabel>use case</FormLabel>
                              <FormControl>
                                 <SelectOptions
                                    state={form.formState.isSubmitting}
                                    type="usecase"
                                    value={field.value}
                                    onChangeHandler={field.onChange}
                                    placeholder="Select usecase"
                                 />
                              </FormControl>
                              <FormMessage className="text-red-600/100 font-bold" />
                           </FormItem>
                        )}
                     />
                  </div>
                  {type === "Create" && (
                     <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                           <FormItem className="w-fit">
                              <FormLabel>Upload images</FormLabel>
                              <FormControl>
                                 <FileUploader
                                    disabled={form.formState.isSubmitting}
                                    imageUrl={field.value}
                                    onFieldChange={field.onChange}
                                    setFiles={setFiles}
                                 />
                              </FormControl>
                              <FormDescription className="text-bold ">
                                 You can only upload a maximum of 3 images
                              </FormDescription>
                              <FormMessage className="text-red-600/100 font-bold" />
                           </FormItem>
                        )}
                     />
                  )}
                  <div>
                     <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                           <FormItem className="w-full">
                              <FormLabel>Descrption</FormLabel>
                              <FormControl>
                                 <TextEditor
                                    value={field.value}
                                    onChange={field.onChange}
                                 />
                              </FormControl>
                              <FormMessage className="text-red-600/100 font-bold" />
                           </FormItem>
                        )}
                     />
                  </div>

                  <p className="text-red-500 text-base rounded-md p-2">
                     {error}
                  </p>
                  <Button
                     className="w-2/12 max-md:w-full"
                     disabled={form.formState.isSubmitting}
                     type="submit"
                  >
                     {form.formState.isSubmitting
                        ? "Submitting..."
                        : `${type} Project`}
                  </Button>
               </form>
            </Form>
         </CardContent>
      </Card>
   );
};

export default CreateForm;
