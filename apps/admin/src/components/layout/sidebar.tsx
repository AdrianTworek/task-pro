'use client';
import { KanbanSquare, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { cn } from 'ui/src/lib/utils';

function SidebarLink({
  href,
  children,
  icon,
}: {
  href: string;
  children: React.ReactNode;
  icon: React.ReactNode;
}) {
  const pathname = usePathname();

  const isActive = pathname.includes(href);

  return (
    <Link
      href={href}
      className={cn(
        'p-2 flex justify-between rounded-md',
        isActive && 'bg-muted'
      )}
    >
      <div className='flex gap-2 items-center'>
        {icon}
        {children}
      </div>
    </Link>
  );
}

export default function Sidebar() {
  return (
    <div className='max-w-[200px] w-full flex flex-col h-full sticky top-12'>
      <SidebarLink
        href='/dashboard/projects'
        icon={<KanbanSquare className='w-5 h-5' />}
      >
        Projects
      </SidebarLink>
      <SidebarLink href='/dashboard/users' icon={<User className='w-5 h-5' />}>
        Users
      </SidebarLink>
    </div>
  );
}
