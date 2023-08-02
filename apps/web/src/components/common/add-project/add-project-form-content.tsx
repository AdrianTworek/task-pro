'use client';
import SearchUserItem from '@/components/common/add-project/search-user-item';
import {
  isCommonErrorResponse,
  isValidationErrorResponse,
} from '@/server/types/errors';
import { searchUserAction } from '@/server/user/user.actions';

import { SearchUsersResult } from '@/server/user/user.services';
import { Loader2, User, X } from 'lucide-react';
import React, { ChangeEvent, useRef, useState } from 'react';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';
import {
  Button,
  Input,
  Label,
  ScrollArea,
  Textarea,
  useToast,
  SubmitButton,
} from 'ui';
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
  selectedUsers: SearchUsersResult;
  setSelectedUsers: React.Dispatch<React.SetStateAction<SearchUsersResult>>;
}) {
  const { toast } = useToast();
  const { pending } = useFormStatus();
  const timeout = React.useRef<NodeJS.Timeout | null>(null);
  const [searchResults, setSearchResults] = useState<SearchUsersResult>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [searchNextPage, setSearchNextPage] = useState<number | undefined>(
    undefined
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const searchForUsers = async (query: string, page?: number) => {
    try {
      const res = await searchUserAction({
        query: query.trim(),
        page: page ?? 1,
      });

      if (isValidationErrorResponse(res) || isCommonErrorResponse(res)) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: res.error.message,
        });
        setLoadingUsers(false);
        return;
      }

      setSearchNextPage(res.nextPage);
      setSearchResults((prev) => [...prev, ...res.users]);
    } catch (e) {
      console.error(e);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong when searching for users',
      });
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleUserSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    setLoadingUsers(true);
    if (timeout.current) clearTimeout(timeout.current);

    if (!e.target.value.trim().length || !e.target.value) {
      setSearchResults([]);
      setLoadingUsers(false);
    } else {
      timeout.current = setTimeout(async () => {
        searchForUsers(e.target.value, 1);
      }, 1000);
    }
  };

  const loadMoreUsers = async () => {
    setLoadingUsers(true);

    if (!inputRef.current?.value.trim().length || !searchNextPage) return;

    searchForUsers(inputRef.current?.value, searchNextPage);
  };
  const showNoUsersFound =
    !loadingUsers &&
    !searchResults.length &&
    !!inputRef.current?.value.trim().length;

  const showSearchedUsers = !!searchResults.length;
  const showSelectedUsers =
    !!selectedUsers.length && !searchResults.length && !showNoUsersFound;

  const showList = showSearchedUsers || showSelectedUsers;

  const showLoader =
    loadingUsers && !searchResults.length && !selectedUsers.length;

  const showEmptyState =
    !loadingUsers && !showList && !inputRef.current?.value.trim().length;

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
          type='search'
          name='users'
          placeholder='Search users by email'
          onChange={handleUserSearch}
          ref={inputRef}
        />
      </div>

      {showLoader && (
        <div className='h-40 flex flex-col items-center justify-center mb-6 border rounded-sm'>
          <Loader2 className='w-8 h-8 animate-spin mb-2' />
          <h5>Looking for users</h5>
        </div>
      )}

      {showNoUsersFound && (
        <div
          className={cn(
            ' h-40 flex items-center justify-center flex-col border rounded-sm mb-6 transition-all',
            pending && 'opacity-50 cursor-not-allowed'
          )}
        >
          <X className='w-8 h-8 mb-2' />
          <h5>Not found</h5>
          <span className='text-sm text-gray-500'>
            There is no user that matches your search
          </span>
        </div>
      )}

      {showEmptyState && (
        <div
          className={cn(
            ' h-40 flex items-center justify-center flex-col border rounded-sm mb-6 transition-all',
            pending && 'opacity-50 cursor-not-allowed'
          )}
        >
          <User className='w-8 h-8 mb-2' />
          <h5>Add members</h5>
          <span className='text-sm text-gray-500'>
            Search for users by email and add them to this project
          </span>
        </div>
      )}

      {showList && (
        <ScrollArea
          className={cn(
            'h-40 border rounded mb-6 transition-all',
            (pending || loadingUsers) && 'opacity-50 cursor-not-allowed'
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
              {searchNextPage && (
                <Button
                  disabled={loadingUsers}
                  type='button'
                  variant='link'
                  className='text-center w-full'
                  onClick={loadMoreUsers}
                >
                  Load more
                </Button>
              )}
              {!searchNextPage && (
                <p className='w-full px-4 py-2 my-0.5 text-center text-sm'>
                  No more users to load
                </p>
              )}
            </div>
          )}
        </ScrollArea>
      )}
      <SubmitButton disabled={pending}>Create project</SubmitButton>
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
