import Link from "next/link";
import { Menu, LayoutDashboard } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { getUserStatus } from "@/lib/user/getUserStatus";
import { redirect } from "next/navigation";

const AdminDashBoardLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { isUserAuthenticated, canViewAdmin } = await getUserStatus();

  if (!isUserAuthenticated) redirect("/api/auth/login?");

  if (!canViewAdmin?.isGranted) redirect("/");

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <div className="flex items-center gap-2 font-semibold">
              <LayoutDashboard className="h-6 w-6" />
              <span className="">Dashboard</span>
            </div>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 font-medium lg:px-4">
              <Link
                href="/admin/customer"
                className="cursor-pointer flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
              >
                Customers
              </Link>

              <Link
                href="/admin/stations"
                className="cursor-pointer flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
              >
                Stations
              </Link>

              <Link
                href="/admin/riders"
                className="cursor-pointer flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
              >
                Workers
              </Link>

                 <Link
                href="/admin/booking"
                className="cursor-pointer flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
              >
                Booking
              </Link>

              <Link
                href="/admin/map"
                className="cursor-pointer flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
              >
                Map
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col z-[10050]">
              <nav className="grid gap-2 text-lg font-medium">
                <div className="mb-8 flex items-center gap-2 text-lg font-semibold">
                  <LayoutDashboard className="h-6 w-6" />
                  <span className="">Dashboard</span>
                </div>

                <SheetClose asChild>
                  <Link
                    href="/admin/customer"
                    className="cursor-pointer flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
                  >
                    Customers
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link
                    href="/admin/stations"
                    className="cursor-pointer flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
                  >
                    Stations
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link
                    href="/admin/riders"
                    className="cursor-pointer flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
                  >
                    Workers
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link
                    href="/admin/map"
                    className="cursor-pointer flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
                  >
                    Map
                  </Link>
                </SheetClose>
                  <SheetClose asChild>
                  <Link
                    href="/admin/booking"
                    className="cursor-pointer flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
                  >
                    Booking
                  </Link>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-2 lg:gap-6 lg:p-4">
          <div className="flex items-center"></div>
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminDashBoardLayout;
