'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'ui';
import ThemeToggle from '@/components/common/theme-toggle';
import { LogOut, LayoutDashboard, User } from 'lucide-react';

export default function Navbar() {
  const { data: session } = useSession();

  const router = useRouter();

  return (
    <nav className="w-full bg-background border-b sticky top-0 z-[50]">
      <div className="flex items-center justify-between py-4 px-6 container">
        <h1>
          <Link
            href="/"
            className="scroll-m-20 text-2xl font-semibold tracking-tight"
          >
            TaskPRO
          </Link>
        </h1>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {!session && (
            <Link href="/login">
              <Button>Sign in</Button>
            </Link>
          )}
          {!!session && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-none rounded-full"
                >
                  <Avatar>
                    <AvatarImage
                      src={session.user?.image ?? ''}
                      alt={`${session.user?.name}'s avatar`}
                    />
                    <AvatarFallback>
                      <User />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => router.push('/dashboard/projects')}
                >
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  );
}
