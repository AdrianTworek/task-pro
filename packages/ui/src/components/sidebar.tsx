'use client';
import { KanbanSquare, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { cn } from '../lib/utils';

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

export default function Sidebar({
  links,
}: {
  links: { href: string; label: string; icon: React.ReactNode }[];
}) {
  return (
    <div className='w-[200px] min-w-[200px] flex flex-col h-full sticky top-12'>
      {links.map((link) => (
        <SidebarLink
          href={link.href}
          icon={link.icon}
          key={`sidebar__link__` + link.href + link.label}
        >
          {link.label}
        </SidebarLink>
      ))}
    </div>
  );
}
