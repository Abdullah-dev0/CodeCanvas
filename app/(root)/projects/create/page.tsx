import CreateForm from "@/components/shared/ProjectForm";
import { auth, currentUser } from "@clerk/nextjs/server";

const CreateProject = async () => {
   const {userId} =  auth();
   if (!userId) return null;
   return <CreateForm type={"Create"} userId={userId} />;
};

export default CreateProject;
