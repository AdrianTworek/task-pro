import { prisma } from 'database';
import { Button } from 'ui';

export default async function Home() {
  const examples = await prisma.example.findMany();
  console.log(examples);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Button variant="destructive">TaskPro Admin</Button>
    </main>
  );
}
