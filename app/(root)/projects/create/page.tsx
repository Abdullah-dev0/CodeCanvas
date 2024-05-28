import CreateForm from "@/components/shared/ProjectForm";
import { currentUser } from "@clerk/nextjs/server";

const CreateProject = async () => {
   const user = await currentUser();
   if (!user) return null;
   return <CreateForm type={"create"} userId={user?.id} />;
};

export default CreateProject;
