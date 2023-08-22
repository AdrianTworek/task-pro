import React from 'react';

import { RoleEnum } from 'database';

import UsersTable from '@/app/dashboard/users/users-table';
import { fetchUsers } from '@/server/user/user.fetchers';

export type User = {
  id: string;
  name: string;
  role: RoleEnum;
  email: string;
  image: string;
};

export default async function UsersPage() {
  const data = await fetchUsers();

  return (
    <>
      <h1 className='text-4xl font-semibold mb-6'>Users</h1>
      <UsersTable data={data.users} />
    </>
  );
}
