type ProjectDetailProps = {
   id: string;
};

const ProjectDetail = ({ id }: ProjectDetailProps) => {
   return (
      <div>
         <h1>Project Detail</h1>
         <p>Project ID: {id}</p>
      </div>
   );
};

export default ProjectDetail;
