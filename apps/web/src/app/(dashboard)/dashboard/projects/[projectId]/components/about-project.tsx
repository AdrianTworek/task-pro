import { GetProjectResult } from '@/server/project/project.services';
import { formatDate } from '@/utils/format-date';
import { MemberEnum } from 'database';

import { Pencil } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  Button,
  CardContent,
  Sheet,
  SheetTrigger,
  SheetContent,
} from 'ui';
import EditProjectForm from '@/components/common/edit-project/edit-project-form';
import { getAppServerSession } from '@/utils/get-server-session';

export default async function AboutProject({
  project,
}: {
  project: GetProjectResult;
}) {
  const session = await getAppServerSession();

  if (!project) return null;

  const projectOwner = project.members.find(
    (member) => member.role === MemberEnum.OWNER,
  );

  return (
    <Card className="drop-shadow-md">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>About this project</CardTitle>
        {session?.user.id === projectOwner?.user.id && (
          <Sheet>
            <SheetTrigger>
              <Button variant="ghost">
                <Pencil className="w-4 h-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <EditProjectForm project={project} />
            </SheetContent>
          </Sheet>
        )}
      </CardHeader>
      <CardContent className="text-muted-foreground space-y-4">
        <p>Description: {project.description}</p>
        <p>
          Project owner: {projectOwner?.user.name} ({projectOwner?.user.email})
        </p>
        <p>Created: {formatDate(project.createdAt)}</p>
      </CardContent>
    </Card>
  );
}
