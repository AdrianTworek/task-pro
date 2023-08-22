import React from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className='px-12 flex-grow'>{children}</div>;
}
