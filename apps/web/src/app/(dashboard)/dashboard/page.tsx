import { redirect } from 'next/navigation';
import { getAppServerSession } from '@/utils/get-server-session';

export default async function DashboardPage() {
  const session = await getAppServerSession();

  if (session?.user) {
    redirect('/dashboard/projects');
  }
}
