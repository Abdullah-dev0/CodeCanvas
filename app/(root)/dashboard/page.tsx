import { currentUser } from "@clerk/nextjs/server";

const Dashboard = async () => {
   const user = await currentUser();
   if (!user) return null;
   return (
      <div>
         <p>Welcome {user.fullName}!</p>
         <p>{user.id}</p>
      </div>
   );
};

export default Dashboard;
