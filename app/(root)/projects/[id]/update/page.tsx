import { getProjectById } from "@/actions/project.actions";
import ProjectForm from "@/components/shared/ProjectForm";
import { auth } from "@clerk/nextjs/server";
import { Project } from "@prisma/client";
type UpdateEventProps = {
  params: {
    id: string;
  };
};
const Update = async ({ params: { id } }: UpdateEventProps) => {
  const { userId } = auth();
  if (!userId) return null;
  const project = (await getProjectById(id)) as Project;
  return (
    <>
      <ProjectForm userId={userId} data={project} type={"Update"} />
    </>
  );
};

export default Update;
