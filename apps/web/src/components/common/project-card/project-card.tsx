import { User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from 'ui';

const formatDate = (date: Date) => {
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
  createdAt: Date;
  users: Array<{ id: string; image: string | null }>;
}) {
  const usersToDisplay = users.slice(0, 4);

  const usersLeft = users.length - usersToDisplay.length;

  return (
    <Link href={`/project/${id}`}>
      <Card className="min-h-[220px] h-full hover:shadow hover:shadow-background hover:scale-[102%] transition-all ease-out hover:border-foreground">
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex group">
          {usersToDisplay.map((user, idx) => (
            <div
              style={{ translate: idx * -4 + 4 }}
              className="w-8 h-8 flex items-center justify-center object-cover rounded-full ring-[3px] ring-background overflow-hidden"
              key={'userImage__' + user.id}
            >
              <Avatar className="w-full h-full">
                <AvatarImage
                  src={user.image ?? undefined}
                  alt={'User avatar'}
                />
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
            </div>
          ))}
          {usersLeft > 0 && (
            <div
              style={{ translate: usersToDisplay.length * -4 + 4 }}
              className="w-8 h-8 flex items-center justify-center object-cover rounded-full ring-[3px] ring-background overflow-hidden"
            >
              <Avatar className="w-full h-full text-sm">
                <AvatarFallback>{usersLeft}+</AvatarFallback>
              </Avatar>
            </div>
          )}
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground">
          {formatDate(createdAt)}
        </CardFooter>
      </Card>
    </Link>
  );
}
