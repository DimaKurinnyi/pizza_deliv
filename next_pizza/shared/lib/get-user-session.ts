
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '../constants/auth-options';

export const getUserSession = async () => {
  const session = await getServerSession(nextAuthOptions);
  return session?.user ?? null;
};
