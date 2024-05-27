

const ProjectDetail = ({ params }: { params: { id: string } }) => {
   return (
      <div>
         <h1>Project Detail</h1>
         <p>Project ID: {params.id}</p>
      </div>
   );
};

export default ProjectDetail;
