import React from 'react';
import { Separator, Skeleton } from 'ui';

export default function ProjectLoading() {
  return (
    <div className="flex flex-col">
      <Skeleton className="w-72 h-16 mb-6" />
      <Separator />
      <div className="mt-12 grid xl:grid-cols-3 gap-4">
        <Skeleton className="h-[200px] xl:h-[500px] xl:col-span-2" />
        <div className="space-y-4">
          <Skeleton className="h-[112px] xl:h-[292px]" />
          <Skeleton className="h-[72px] xl:h-[192px]" />
        </div>
      </div>
    </div>
  );
}
