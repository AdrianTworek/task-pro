import AdminLogin from '@/components/admin-login';
import { getAppServerSession } from '@/utils/get-server-session';

export default async function Home() {
  const data = await getAppServerSession();

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <AdminLogin />

      {data?.user && <p className="pt-4">Hello, {data?.user?.email}</p>}
    </main>
  );
}
