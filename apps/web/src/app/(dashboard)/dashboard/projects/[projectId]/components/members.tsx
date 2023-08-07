import { GetProjectResult } from '@/server/project/project.services';
import { User } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Avatar,
  AvatarImage,
  AvatarFallback,
} from 'ui';

export default function Members({ project }: { project: GetProjectResult }) {
  if (!project) return null;

  return (
    <Card className="drop-shadow-md">
      <CardHeader>
        <CardTitle>Members ({project.members.length})</CardTitle>
      </CardHeader>
      <CardContent className="flex group">
        {project.members.slice(0, 8).map((member, idx) => (
          <div
            style={{ translate: idx * -4 + 4 }}
            className="w-8 h-8 flex items-center justify-center object-cover rounded-full ring-[3px] ring-background overflow-hidden"
            key={'userImage__' + member.user.id}
          >
            <Avatar className="w-full h-full">
              <AvatarImage
                src={member.user.image ?? undefined}
                alt={'User avatar'}
              />
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
