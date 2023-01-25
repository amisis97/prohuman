import React, { useCallback } from 'react';

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
    <div>
      <button disabled={page < 2} onClick={handlePrevClick}>
        Előző
      </button>
      <button disabled={page >= allPage} onClick={handleNextClick}>
        Következő
      </button>
    </div>
  );
};
