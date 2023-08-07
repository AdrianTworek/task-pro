'use client';

import { useEffect, useState } from 'react';

import { Button, Sheet, SheetContent, SheetTrigger } from 'ui';
import { Menu } from 'lucide-react';
import Sidebar from './sidebar';

export default function MobileSidebar() {
  const [isMounted, setIsMounted] = useState(false);

  // Prevents from hydration error
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-64">
        <Sidebar isMobile={true} />
      </SheetContent>
    </Sheet>
  );
}
