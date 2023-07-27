import Image from 'next/image';
import React from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from 'ui';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export function ProjectCard({
  id,
  name,
  description,
  createdAt,
  users,
}: {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  users: Array<{ id: string; image: string }>;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className='flex'>
        {users.map((user) => (
          <div
            className='relative w-8 h-8 object-cover rounded-full first:translate-x-0 -translate-x-2 ring-[3px] ring-background overflow-hidden'
            key={'userImage__' + user.id}
          >
            <Image src={user.image} alt={'User avatar'} fill />
          </div>
        ))}
      </CardContent>
      <CardFooter className='text-xs text-muted-foreground'>
        {formatDate(createdAt)}
      </CardFooter>
    </Card>
  );
}
