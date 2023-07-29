'use client';
import SearchUserItem from '@/components/common/add-project/search-user-item';
import { SearchUsersResponse } from '@/server/user/user.services';
import { Loader2, User, X } from 'lucide-react';
import React, { ChangeEvent, useState } from 'react';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';
import { Button, Input, Label, ScrollArea, Textarea } from 'ui';
import { cn } from 'ui/src/lib/utils';

export function AddProjectFormContent({
  error,
  validationErrors,
  closeDialog,
  selectedUsers,
  setSelectedUsers,
}: {
  error: string | null;
  validationErrors: string[];
  closeDialog: () => void;
  selectedUsers: SearchUsersResponse;
  setSelectedUsers: React.Dispatch<React.SetStateAction<SearchUsersResponse>>;
}) {
  const { pending } = useFormStatus();
  const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);
  const timeout = React.useRef<NodeJS.Timeout | null>(null);
  const [searchResults, setSearchResults] = useState<SearchUsersResponse>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  const handleUserSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    setLoadingUsers(true);
    if (timeout.current) clearTimeout(timeout.current);

    if (!e.target.value.trim().length || !e.target.value) {
      setSearchResults([]);
      setLoadingUsers(false);
    } else {
      timeout.current = setTimeout(async () => {
        const res = await fetch(`/api/users/search?q=${e.target.value.trim()}`);
        if (!res.ok) {
          console.error('Something went wrong');
          return;
        }

        const { users } = (await res.json()) as { users: SearchUsersResponse };
        setSearchResults(users);
        setLoadingUsers(false);
      }, 1000);
    }
  };

  const showSearchedUsers = !!searchResults.length;
  const showSelectedUsers = !!selectedUsers.length && !searchResults.length;

  const showList = showSearchedUsers || showSelectedUsers;

  const showLoader =
    loadingUsers && !searchResults.length && !selectedUsers.length;

  const showEmptyState = !loadingUsers && !showList;

  const showNoUsersFound = !loadingUsers && !searchResults.length;

  return (
    <>
      {!!error && !pending && (
        <div className='bg-destructive p-4 mb-4 rounded-md flex flex-col gap-2 text-sm text-destructive-foreground'>
          <p>{error}</p>
        </div>
      )}
      {!!validationErrors.length && !pending && (
        <div className='bg-destructive p-4 mb-4 rounded-md flex flex-col gap-2 text-sm text-destructive-foreground'>
          {validationErrors.map((error, idx) => (
            <p key={'error__' + idx + '__' + error}>{error}</p>
          ))}
        </div>
      )}
      <div className='grid w-full items-center mb-6 gap-1.5'>
        <Label htmlFor='name'>Name</Label>
        <Input
          disabled={pending}
          name='name'
          placeholder='Name for this project'
        />
      </div>
      <div className='grid w-full items-center mb-6 gap-1.5'>
        <Label htmlFor='description'>Description</Label>
        <Textarea
          disabled={pending}
          name='description'
          placeholder='Describe this project'
        />
      </div>
      <div className='grid w-full items-center mb-4 gap-1.5'>
        <Label htmlFor='users'>Users</Label>
        <Input
          name='users'
          placeholder='Search users by email'
          onChange={handleUserSearch}
        />
      </div>

      {showLoader && (
        <div className='h-40 flex flex-col items-center justify-center mb-6 border rounded-sm'>
          <Loader2 className='w-8 h-8 animate-spin mb-2' />
          <h5>Looking for users</h5>
        </div>
      )}

      {showEmptyState && (
        <div
          className={cn(
            ' h-40 flex items-center justify-center flex-col border rounded-sm mb-6',
            pending && 'opacity-50 cursor-not-allowed'
          )}
        >
          {showNoUsersFound && (
            <>
              <X className='w-8 h-8 mb-2' />
              <h5>Not found</h5>
              <span className='text-sm text-gray-500'>
                There is no user that matches your search
              </span>
            </>
          )}
          {!showNoUsersFound && (
            <>
              <User className='w-8 h-8 mb-2' />
              <h5>Add members</h5>
              <span className='text-sm text-gray-500'>
                Search for users by email and add them to this project
              </span>
            </>
          )}
        </div>
      )}

      {showList && (
        <ScrollArea
          className={cn(
            'h-40 border rounded mb-6',
            pending && 'opacity-50 cursor-not-allowed'
          )}
        >
          {showSelectedUsers && (
            <div>
              {selectedUsers.map((user) => (
                <SearchUserItem
                  user={user}
                  key={'user__selected__' + user.id}
                  isSelected={selectedUsers.some((u) => u.id === user.id)}
                  selectUser={(user) =>
                    setSelectedUsers((prev) => [...prev, user])
                  }
                  removeSelection={(user) =>
                    setSelectedUsers((prev) =>
                      prev.filter((u) => u.id !== user.id)
                    )
                  }
                />
              ))}
            </div>
          )}

          {showSearchedUsers && (
            <div>
              {searchResults.map((user) => (
                <SearchUserItem
                  user={user}
                  key={'user__search__' + user.id}
                  isSelected={selectedUsers.some((u) => u.id === user.id)}
                  selectUser={(user) =>
                    setSelectedUsers((prev) => [...prev, user])
                  }
                  removeSelection={(user) =>
                    setSelectedUsers((prev) =>
                      prev.filter((u) => u.id !== user.id)
                    )
                  }
                />
              ))}
            </div>
          )}
        </ScrollArea>
      )}
      <Button type='submit' disabled={pending} className='relative mb-6'>
        <span
          className={cn(
            'absolute top-1/2 -translate-y-1/2 opacity-100 transition-opacity duration-200',
            pending && 'opacity-0'
          )}
        >
          Create Project
        </span>
        <span
          className={cn(
            'absolute top-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-200 ',
            pending && 'opacity-100'
          )}
        >
          <Loader2 className='w-5 h-5 text-background animate-spin' />
        </span>
      </Button>
      <Button
        disabled={pending}
        onClick={closeDialog}
        type='button'
        variant='secondary'
      >
        Cancel
      </Button>
    </>
  );
}
