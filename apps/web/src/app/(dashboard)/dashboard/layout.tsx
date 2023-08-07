import React from 'react';

import Sidebar from '@/components/common/sidebar';
import MobileSidebar from '@/components/common/mobile-sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed top-16 bottom-0">
        <Sidebar />
      </div>
      <div className="lg:hidden px-8 pt-6">
        <MobileSidebar />
      </div>
      <main className="lg:ml-64 p-8 lg:py-12 lg:px-16">{children}</main>
    </div>
  );
}
