import React, { useEffect, useMemo, useState } from 'react';
import { Option, Select } from '../../ui/field';
import { Pagination } from '../../ui/pagination';
import { Column, DataTable } from '../../ui/table';
import { useQueryUsers } from './api';

const GENDER_OPTIONS: Option[] = [
  { label: 'Nő', value: 'female' },
  { label: 'Férfi', value: 'male' },
];

const columns: Column[] = [
  { field: 'id', headerName: 'ID' },
  { field: 'name', headerName: 'Név', flex: 1 },
  { field: 'address', headerName: 'Cím', flex: 2 },
];

const PAGE_SIZE = 10;

export const List = () => {
  const [page, setPage] = useState(1);
  const [selectedGender, setSelectedGender] = useState('');
  const {
    users,
    info: { recordCount },
  } = useQueryUsers({ page, pageSize: PAGE_SIZE, gender: selectedGender });

  useEffect(() => {
    setPage(1);
  }, [selectedGender]);

  const rows = useMemo(
    () =>
      users.map((user) => ({
        id: user.login.uuid,
        name: `${user.name.title} ${user.name.first} ${user.name.last}`,
        address: `${user.location.postcode}, ${user.location.country} ${user.location.city}`,
      })),
    [users],
  );

  return (
    <div>
      <div className='content-box'>
        <h3>Szűrők</h3>
        <Select
          name='gender'
          value={selectedGender}
          options={GENDER_OPTIONS}
          label='Neme:'
          onChange={(event) => setSelectedGender(event.target.value)}
        />
      </div>
      <div className='content-box'>
        {users.length > 0 ? (
          <>
            <DataTable columns={columns} rows={rows} />
            <Pagination
              page={page}
              allPage={Math.ceil(recordCount / PAGE_SIZE)}
              onChange={setPage}
            />
          </>
        ) : (
          <p>Nincs találat!</p>
        )}
      </div>
    </div>
  );
};
