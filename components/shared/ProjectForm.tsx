"use client";
import { defaultValues } from "@/constant";
import { projectSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "../ui/card";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const CreateForm = () => {
   // 1. Define your form.
   const form = useForm<z.infer<typeof projectSchema>>({
      resolver: zodResolver(projectSchema),
      defaultValues: defaultValues,
   });

   // 2. Define a submit handler.
   function onSubmit(values: z.infer<typeof projectSchema>) {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      console.log(values);
   }

   return (
      <Card className="w-fullc max-w-screen-md mx-auto">
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
                  className="space-y-8"
               >
                  <FormField
                     control={form.control}
                     name="name"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Project Name</FormLabel>
                           <FormControl>
                              <Input placeholder="shadcn" {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <Button type="submit">Deploy</Button>
               </form>
            </Form>
         </CardContent>
      </Card>
   );
};

export default CreateForm;
