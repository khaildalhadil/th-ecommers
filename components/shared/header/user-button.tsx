import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { signOutUser } from "@/lib/actions/user.actions";
import { UserIcon } from "lucide-react";
import Link from "next/link";

const  UserButton = async () => {

  const session = await auth();
  console.log(session)
  

  if (!session) {
    return(
      <Button asChild variant={"outline"} className="">
        <Link href={"sign-in"}>
          تسجيل دخول
          <UserIcon />
        </Link>
      </Button>
    )
  } else{

    return ( 
      <div className="flex gap-2 items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center">
              <Button variant={'ghost'} className="rounded-full ml-2 flex items-center relative w-8 h-8 justify-center bg-gray-200 cursor-pointer">
                {session?.user?.name?.charAt(0).toUpperCase() || "U"}
              </Button>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <div className="text-sm font-bold ">{session?.user?.name}</div>
                <div className="text-xs text-muted-foreground">
                  {session?.user?.email}
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuItem>
              <form action={signOutUser}>
                <button type="submit" className="w-full py-2 px-2 h-2 justify-start">تسجيل خروج</button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
     );
  }

}
 
export default UserButton;