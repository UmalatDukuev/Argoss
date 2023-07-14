import React, { Dispatch, FC, SetStateAction } from 'react';
import classes from './Pagination.module.scss';
import { usePagination } from '../../../hooks/usePagination';
import clsx from "clsx";


interface PaginationProps {
  totalPages: number
  activePage: number,
  setActivePage: Dispatch<SetStateAction<number>>;
}
const Pagination: FC<PaginationProps> = ({totalPages, activePage, setActivePage}) => {
  const pagesArray = usePagination(totalPages);

  return (
    <div className={classes.pagination}>
      {pagesArray.map((page) => (
        <button className={clsx(classes.pagBtn, page===activePage && classes.pagBtnActive)}
          key={page}
          onClick={() => setActivePage(page)}>
          {page}
        </button>
      ))}

    </div>
  );
};

export default Pagination;
