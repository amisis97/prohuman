import React, { useCallback } from 'react';
import styles from './Pagination.module.scss';

interface PaginationProps {
  page: number;
  allPage: number;
  onChange?: (next: number) => void;
}

export const Pagination = ({ page, allPage, onChange }: PaginationProps) => {
  const handlePrevClick = useCallback(() => {
    onChange?.(page - 1);
  }, [onChange, page]);

  const handleNextClick = useCallback(() => {
    onChange?.(page + 1);
  }, [onChange, page]);

  return (
    <div className={styles.pagination}>
      <button disabled={page < 2} onClick={handlePrevClick}>
        Előző
      </button>
      <span>{`${page} / ${allPage}`}</span>
      <button disabled={page >= allPage} onClick={handleNextClick}>
        Következő
      </button>
    </div>
  );
};
