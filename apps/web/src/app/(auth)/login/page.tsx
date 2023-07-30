import { getAppServerSession } from '@/utils/get-server-session';
import { redirect } from 'next/navigation';

import LoginForm from './login-form';

export default async function LoginPage() {
  const session = await getAppServerSession();

  if (session) {
    redirect('/dashboard');
  }

  return <LoginForm />;
}
