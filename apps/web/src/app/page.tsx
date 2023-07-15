import { Button } from 'ui';
import { prisma } from 'database';

export default async function Home() {
  const examples = await prisma.example.findMany();
  console.log(examples);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Button variant="destructive">TaskPro</Button>
    </main>
  );
}
