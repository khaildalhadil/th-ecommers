import { Button } from "@/components/ui/button";
import ModeToggle from "./mode-toggle";
import Link from "next/link";
import { EllipsisVertical, ShoppingCart } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import UserButton from "./user-button";

const Menu = () => {

  return (
    <div className="flex justify-end gap-3">
      <nav className="hidden md:flex w-full max-w-xs gap-1 items-center">
        <ModeToggle />

        <Button asChild variant={"ghost"}>
          <Link href={"/cart"}>
            سلة التسوق
            <ShoppingCart />
          </Link>
        </Button>

        <UserButton />

      </nav>
      <nav className="md:hidden">
        <Sheet>
          <SheetTrigger className="align-middle">
            <EllipsisVertical  />
          </SheetTrigger>

          <SheetContent className="flex flex-col justify-center items-center text-2xl p-5">
            
            <SheetTitle>القائمة</SheetTitle>
            <Button asChild variant={"outline"} className="w-full">
              <Link href={"/cart"}>
                سلة التسوق
                <ShoppingCart />
              </Link>
            </Button>

            <ModeToggle />

            <UserButton />

            <SheetDescription></SheetDescription>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
}
 
export default Menu;