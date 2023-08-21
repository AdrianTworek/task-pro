'use client';

import { GetProjectsResult } from '@/server/project/project.services';
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
import { ChevronUp } from 'lucide-react';

import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Button, DataTable, Input } from 'ui';
import { cn } from 'ui/src/lib/utils';

const columns: ColumnDef<GetProjectsResult[number]>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      const sortingOrder = column.getIsSorted();

      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(sortingOrder === 'asc')}
        >
          Name{' '}
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
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => {
      const formattedDate = new Date(row.getValue('createdAt')).toLocaleString(
        'en-US',
        {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }
      );
      return <span className='w-max whitespace-nowrap'>{formattedDate}</span>;
    },
  },
];

export default function ProjectsTable({ data }: { data: GetProjectsResult }) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'name', desc: false },
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
      table.getColumn('name')?.setFilterValue(e.target.value);
    }, 1000);
  };

  return (
    <div className='flex flex-col gap-6'>
      <Input
        type='search'
        onChange={handleEmailSearch}
        className='max-w-xs'
        placeholder='Search project name'
      />
      <DataTable columns={columns} table={table} />
      <div className='flex w-full gap-4 justify-between'>
        <span className='text-sm text-muted-foreground'>
          Page {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount()}
        </span>
        <div className='flex gap-4'>
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
    </div>
  );
}
