import { getServerSession } from 'next-auth';
import { OPTIONS } from '@/app/api/auth/[...nextauth]/route';

export const getAppServerSession = () => getServerSession(OPTIONS);
