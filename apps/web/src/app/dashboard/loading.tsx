'use client';
import { ProjectCardSkeleton } from '@/components/common/project-card/project-card-skeleton';
import React from 'react';

export default function LoadingDashboard() {
  return (
    <main className='container py-12 flex flex-col'>
      <h1 className='text-4xl font-semibold mb-6'>Projects</h1>
      <div className='grid grid-cols-3 gap-8 xl:grid-cols-4'>
        {Array.from({ length: 8 }).map((_, idx) => (
          <ProjectCardSkeleton key={'project__skeleton__' + idx} />
        ))}
      </div>
    </main>
  );
}
