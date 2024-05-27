import CreateForm from "@/components/shared/ProjectForm";
import { currentUser } from "@clerk/nextjs/server";

const CreateProject = async () => {
   const user = await currentUser();
   if (!user) return null;
   return <CreateForm userId={user?.id} />;
};

export default CreateProject;
