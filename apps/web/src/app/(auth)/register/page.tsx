import { getAppServerSession } from '@/utils/get-server-session';
import { redirect } from 'next/navigation';

import RegisterForm from './register-form';

export default async function RegisterPage() {
  const session = await getAppServerSession();

  if (session) {
    redirect('/dashboard/projects');
  }

  return <RegisterForm />;
}
