import { getUserStatus } from "@/lib/user/getUserStatus";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ProfileIcon = async () => {
  const { user, isUserAuthenticated, canViewAdmin } = await getUserStatus();

  const initials =
    user &&
    (user.given_name ? user.given_name[0] : "") +
      (user.family_name ? user.family_name[0] : "");
  console.log(user);

  return (
    isUserAuthenticated && (
      <div>
        {/* <Image src={user?.picture} width={40} height={40} alt=""/> */}

        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full">
            <p className="flex flex-col justify-center items-center w-10 h-10 rounded-full bg-secondary p-2  border border-primary cursor-pointer">
              {initials}
            </p>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
           
            {canViewAdmin?.isGranted ? <>
         
            <DropdownMenuItem>Dashboard</DropdownMenuItem>
             <DropdownMenuSeparator />
            </> : <><DropdownMenuItem>Track</DropdownMenuItem>
             <DropdownMenuSeparator />
            <DropdownMenuItem>Account</DropdownMenuItem>
             <DropdownMenuSeparator /></>}
            <DropdownMenuItem>
              <LogoutLink>Sign Out</LogoutLink>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  );
};

export default ProfileIcon;
