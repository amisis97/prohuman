import React from 'react';
import styles from './DataTable.module.scss';
import { Column } from './model';
import classNames from 'classnames';

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
          <div key={field} className={classNames(styles[`flex-${flex}`], styles.cell)}>
            {headerName ?? field}
          </div>
        ))}
      </div>
      {rows.map((row) => (
        <div key={row[idField] as string} className={styles.row}>
          {columns.map(({ field, flex = 1 }) => (
            <div className={classNames(styles[`flex-${flex}`], styles.cell)} key={field}>
              {row[field] as string}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
