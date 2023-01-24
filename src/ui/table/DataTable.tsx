import React from 'react';

interface TableProps {
  columns: { field: string; headerName?: string; flex?: number }[];
}

export const DataTable = ({ columns }: TableProps) => {
  return (
    <div>
      <div></div>
    </div>
  );
};
