import React from 'react';
import styles from './DataTable.module.scss';
import { Column } from './model';

interface TableProps {
  idField?: string;
  columns: Column[];
  rows: Record<string, unknown>[];
}

export const DataTable = ({ idField = 'id', columns, rows }: TableProps) => {
  return (
    <div>
      <div className={styles.row}>
        {columns.map(({ field, headerName, flex = 1 }) => (
          <div key={field} className={styles[`flex-${flex}`]}>
            {headerName ?? field}
          </div>
        ))}
      </div>
      {rows.map((row) => (
        <div key={row[idField] as string} className={styles.row}>
          {columns.map(({ field, flex = 1 }) => (
            <div className={styles[`flex-${flex}`]} key={field}>
              {row[field] as string}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
