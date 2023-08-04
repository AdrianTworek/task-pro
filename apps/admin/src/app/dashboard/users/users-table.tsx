'use client';

import { getUsersResult } from '@/server/user/user.services';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronUp, User } from 'lucide-react';

import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DataTable,
  Input,
} from 'ui';
import { cn } from 'ui/src/lib/utils';

const columns: ColumnDef<getUsersResult[number]>[] = [
  {
    accessorKey: 'image',
    header: 'Image',
    cell: ({ row }) => {
      return (
        <Avatar>
          <AvatarImage
            src={row.getValue('image')}
            alt={`${row.getValue('name')}'s avatar`}
          />
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      const sortingOrder = column.getIsSorted();

      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(sortingOrder === 'asc')}
        >
          Email{' '}
          {sortingOrder && (
            <ChevronUp
              className={cn(
                'ml-2 w-4 h-4 transition-transform',
                sortingOrder === 'desc' && 'rotate-180'
              )}
            />
          )}
        </Button>
      );
    },
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
];

export default function UsersTable({ data }: { data: getUsersResult }) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'email', desc: false },
  ]);

  const searchEmailTimeout = useRef<NodeJS.Timeout | null>(null);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    state: {
      columnFilters,
      sorting,
    },
  });

  useEffect(() => {
    return () => {
      if (searchEmailTimeout.current) {
        clearTimeout(searchEmailTimeout.current);
      }
    };
  }, []);

  const handleEmailSearch = (e: ChangeEvent<HTMLInputElement>) => {
    if (searchEmailTimeout.current) {
      clearTimeout(searchEmailTimeout.current);
      searchEmailTimeout.current = null;
    }

    searchEmailTimeout.current = setTimeout(() => {
      table.getColumn('email')?.setFilterValue(e.target.value);
    }, 1000);
  };

  return (
    <div className='flex flex-col gap-6'>
      <Input
        type='search'
        onChange={handleEmailSearch}
        className='max-w-xs'
        placeholder='Search by email'
      />
      <DataTable columns={columns} table={table} />
      <div className='flex self-end gap-4'>
        <Button
          variant='outline'
          onClick={() => {
            window.scrollTo({ behavior: 'smooth', top: 0 });
            table.previousPage();
          }}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant='outline'
          onClick={() => {
            window.scrollTo({ behavior: 'smooth', top: 0 });
            table.nextPage();
          }}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
