import React, { useState } from 'react';
import { Pagination } from '../../ui/pagination';
import { Column, DataTable } from '../../ui/table';
import { useQueryUsers } from './api';

const columns: Column[] = [
  { field: 'id', headerName: 'ID' },
  { field: 'name', headerName: 'Név', flex: 2 },
];

const PAGE_SIZE = 10;

export const List = () => {
  const [page, setPage] = useState(1);
  const {
    users,
    info: { recordCount },
  } = useQueryUsers({ page, pageSize: PAGE_SIZE });

  const rows = users.map((user) => ({
    id: user.login.uuid,
    name: `${user.name.title} ${user.name.first} ${user.name.last}`,
  }));

  if (users.length === 0) {
    return <p>Nincs találat!</p>;
  }

  return (
    <div>
      <DataTable columns={columns} rows={rows} />
      <Pagination page={page} allPage={Math.ceil(recordCount / PAGE_SIZE)} onChange={setPage} />
    </div>
  );
};
