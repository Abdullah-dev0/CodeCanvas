import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";

const Header = () => {
   return (
      <header>
         <SignedOut>
            <Button>
               <SignInButton />
            </Button>
         </SignedOut>
         <SignedIn>
            <UserButton />
         </SignedIn>
      </header>
   );
};

export default Header;
