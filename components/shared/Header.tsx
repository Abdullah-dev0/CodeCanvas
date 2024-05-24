import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "../theme/Toggle";
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
         <ModeToggle />
      </header>
   );
};

export default Header;
