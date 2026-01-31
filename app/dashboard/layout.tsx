import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { PackageIcon } from "lucide-react";
import { SignoutButton } from "@/app/auth/signout-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Suspense } from "react";

const navLinks = [{ title: "Dashboard", href: "/dashboard", badge: 3 }];
const activeLink = "/dashboard";

function Sidebar() {
  return (
    <div className="hidden w-80 border-r lg:block">
      <div className="flex h-full flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4">
          <Link className="flex items-center gap-2 font-semibold" href="/">
            <PackageIcon className="h-6 w-6" />
            <span className="">Acme Inc</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                className={`${
                  activeLink === link.href
                    ? "bg-gray-100 text-gray-900 hover:text-gray-900"
                    : ""
                } flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900`}
                href={link.href}
                key={link.title}
              >
                <span>{link.title}</span>
                {link.badge > 0 && (
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    {link.badge}
                  </Badge>
                )}
              </Link>
            ))}
          </nav>
        </div>
        <div className="border-t p-4">
          <SignoutButton />
        </div>
      </div>
    </div>
  );
}

async function AuthenticatedHeader() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session)
    return (
      <div className="min-h-screen flex justify-center items-center font-semibold">
        Not authenticated
      </div>
    );
  return (
    <header className="flex h-14 items-center border-b px-4 md:gap-4">
      <Link
        className="flex items-center rounded-md bg-gray-100 px-2 py-2 lg:hidden"
        href="/"
      >
        <PackageIcon className="h-6 w-6" />
        <span className="sr-only">Home</span>
      </Link>
      <h1 className="md:block hidden text-lg font-semibold">Dashboard</h1>
      <div className="ml-auto flex items-center gap-4">
        <Avatar>
          <AvatarImage src={session.user.image || ""} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}

export default async function Layout({ children }: LayoutProps<"/dashboard">) {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <div className="flex w-full flex-col">
        <Suspense fallback={<div>Loading header...</div>}>
          <AuthenticatedHeader />
        </Suspense>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
