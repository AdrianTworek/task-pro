import { getAppServerSession } from '@/utils/get-server-session';

import AdminLoginForm from '@/app/(auth)/admin-login-form';
import { redirect } from 'next/navigation';

export default async function Home() {
  const data = await getAppServerSession();

  if (data?.user) {
    redirect('/dashboard');
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <AdminLoginForm />
    </main>
  );
}
