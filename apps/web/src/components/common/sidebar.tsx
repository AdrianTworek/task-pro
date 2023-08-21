'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

import { Button, SheetClose } from 'ui';
import { GanttChartSquareIcon, LogOut, SettingsIcon } from 'lucide-react';
import { cn } from 'ui/src/lib/utils';

const routes = [
  {
    label: 'Projects',
    icon: GanttChartSquareIcon,
    href: '/dashboard/projects',
  },
  {
    label: 'Settings',
    icon: SettingsIcon,
    href: '/dashboard/settings',
  },
];

export default function Sidebar({ isMobile = false }: { isMobile?: boolean }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-1 h-full pt-16 pb-6 border-r">
      <div className="flex flex-col justify-between px-3 w-full h-full">
        <div className="flex flex-col gap-1">
          {routes.map((route, idx) =>
            isMobile ? (
              <SheetClose key={route.href + idx} asChild>
                <Link
                  href={route.href}
                  className={cn(
                    'p-3 text-sm cursor-pointer hover:bg-black/10 dark:hover:text-white dark:hover:bg-white/10 rounded-lg transition',
                    pathname.startsWith(route.href) &&
                      'text-primary dark:bg-white/10 bg-black/10 ',
                  )}
                >
                  <div className="flex items-center flex-1">
                    <route.icon className="w-5 h-5 mr-3" />
                    {route.label}
                  </div>
                </Link>
              </SheetClose>
            ) : (
              <Link
                key={route.href + idx}
                href={route.href}
                className={cn(
                  'p-3 text-sm cursor-pointer hover:bg-black/10 dark:hover:text-white dark:hover:bg-white/10 rounded-lg transition',
                  pathname.startsWith(route.href) &&
                    'text-primary dark:bg-white/10 bg-black/10 ',
                )}
              >
                <div className="flex items-center flex-1">
                  <route.icon className="w-5 h-5 mr-3" />
                  {route.label}
                </div>
              </Link>
            ),
          )}
        </div>
        <div className="flex flex-col gap-4">
          <Button variant="outline" onClick={() => signOut()}>
            <LogOut className="mr-2 h-4 w-4" />
            <span className="text-xs">Logout</span>
          </Button>
          <p className="text-xs text-muted-foreground">
            TaskPRO {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
