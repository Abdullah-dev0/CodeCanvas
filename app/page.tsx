"use client"

import { FileUploader } from "@/components/shared/FileUploader";
import { ModeToggle } from "@/components/theme/Toggle";

const HomePage = () => {
   return (
      <div className="text-center grid place-items-center gap-5  h-screen">
         <ModeToggle />
         <FileUploader
            imageUrl="https://images.unsplash.com/photo-1575936123452-b67c3203c357?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
            onFieldChange={() => {}}
            setFiles={() => {}}
         />
      </div>
   );
};

export default HomePage;
