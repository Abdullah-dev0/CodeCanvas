import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "../theme/Toggle";
import { Button } from "../ui/button";

const Header = () => {
   return (
      <header className="flex justify-between items-center p-5">
         <h1 className="text-4xl font-bold">CodeCanvas</h1>
         <div className="flex items-center gap-5">
            <SignedOut>
               <Button>
                  <SignInButton />
               </Button>
            </SignedOut>

            <SignedIn>
               <UserButton />
            </SignedIn>
            <ModeToggle />
         </div>
      </header>
   );
};

export default Header;
