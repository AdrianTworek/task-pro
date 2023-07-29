'use client';
import { SearchUsersResponse } from '@/server/user/user.services';
import { PlusIcon, Trash2, User } from 'lucide-react';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from 'ui';

export default function SearchUserItem({
  user,
  isSelected,
  selectUser,
  removeSelection,
  disabled,
}: {
  user: SearchUsersResponse[number];
  isSelected: boolean;
  selectUser: (user: SearchUsersResponse[number]) => void;
  removeSelection: (user: SearchUsersResponse[number]) => void;
  disabled?: boolean;
}) {
  return (
    <div className='border-b last:border-none p-2 py-3 text-sm flex justify-between items-center gap-2'>
      <div className='flex gap-2 items-center'>
        <Avatar className='w-8 h-8'>
          <AvatarImage
            src={user.image ?? undefined}
            alt={'avatar of user with email ' + user.email}
          />
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
        <span>{user.email}</span>
      </div>
      {!isSelected && (
        <button
          disabled={disabled}
          type='button'
          className='p-2 hover:opacity-75 transition-opacity'
          onClick={() => selectUser(user)}
        >
          <PlusIcon className='w-5 h-5' />
        </button>
      )}
      {isSelected && (
        <button
          disabled={disabled}
          type='button'
          className='p-2 hover:opacity-75 transition-opacity'
          onClick={() => removeSelection(user)}
        >
          <Trash2 className='w-5 h-5 text-destructive' />
        </button>
      )}
    </div>
  );
}
