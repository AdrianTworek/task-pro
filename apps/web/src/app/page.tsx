import Link from 'next/link';
import { Button } from 'ui';

export default async function Home() {
  return (
    <main className='flex h-full flex-col items-center p-24'>
      <Link href='/dashboard'>
        <Button variant='default'>Dashboard</Button>
      </Link>
    </main>
  );
}
