import React, { FC } from 'react';
import classes from './TableHeader.module.scss';

interface TableHeaderProps {
  page: boolean;
}

const TableHeader: FC<TableHeaderProps> = ({ page }) => {
  return (
    <>
      {!page ? (
        <div className={classes.header}>
          <p className={classes.header__item}>ФИО</p>
          <p className={classes.header__item}>Подразделение</p>
          <p className={classes.header__item}>Должность</p>
        </div>
      ) : (
        <div className={classes.report}>
          <input type="checkbox" className={classes.report__check} />
          <div className={classes.report__header}>Шаблоны отчетов</div>
          <p className={classes.report__header}>Дата</p>
        </div>
      )}
    </>
  );
};

export default TableHeader;
