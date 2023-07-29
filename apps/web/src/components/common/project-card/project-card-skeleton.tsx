import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Skeleton,
} from 'ui';

export function ProjectCardSkeleton() {
  return (
    <Card className='min-h-[220px]'>
      <CardHeader>
        <CardTitle>
          <Skeleton className='w-1/2 h-5 my-1' />
        </CardTitle>
        <CardDescription className='flex flex-col gap-2'>
          <Skeleton className='w-full h-3' />
          <Skeleton className='w-4/5 h-3' />
          <Skeleton className='w-1/3 h-3' />
        </CardDescription>
      </CardHeader>
      <CardContent className='flex'>
        <Skeleton className='w-8 h-8 rounded-full ring-[3px] ring-background' />
      </CardContent>
      <CardFooter>
        <Skeleton className='w-1/2 h-3' />
      </CardFooter>
    </Card>
  );
}
