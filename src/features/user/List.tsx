import React from 'react';
import { DataTable } from '../../ui/table';
import { useFetchUsers } from './api';

export const List = () => {
  const { users, isLoading } = useFetchUsers({ page: 1 });

  return <DataTable columns={[]}></DataTable>;
};
