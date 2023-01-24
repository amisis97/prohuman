import React from 'react';
import { Column, DataTable } from '../../ui/table';
import { useFetchUsers } from './api';

const columns: Column[] = [
  { field: 'id', headerName: 'ID' },
  { field: 'name', headerName: 'Név', flex: 2 },
];

export const List = () => {
  const { users, isLoading } = useFetchUsers({ page: 1 });

  const rows = users.map((user) => ({
    id: user.login.uuid,
    name: `${user.name.title} ${user.name.first} ${user.name.last}`,
  }));

  if (isLoading) {
    return <p>Töltés...</p>;
  }

  return <DataTable columns={columns} rows={rows}></DataTable>;
};
