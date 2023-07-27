import { getAppServerSession } from '@/utils/get-server-session';

export default async function DashboardPage() {
  const data = await getAppServerSession();

  return <div>Dashboard - {data?.user?.email}</div>;
}
