import { Button } from "@/components/ui/button";
import Link from "next/link";

const Dashboard = async () => {
   return (
      <div className="flex justify-between items-center px-4">
         <h1>Dashboard</h1>
         <Link href="/projects/create">
            <Button>Create Project</Button>
         </Link>
      </div>
   );
};

export default Dashboard;
