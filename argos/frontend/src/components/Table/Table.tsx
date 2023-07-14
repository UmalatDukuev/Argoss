import React, { FC } from 'react';
import classes from './Table.module.scss';
import TableHeader from './TableHeader/TableHeader';
import Toolbar from '../Toolbar/Toolbar';
import TableListWorkers from './TableListWorkers';
import TableListReport from './TableListReport';

type TableProps = {
  page: boolean
}

const Table: FC<TableProps> = ({ page }) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.table}>
        <Toolbar page={page} />
        <TableHeader page={page} />
        {!page ?
          <TableListWorkers/>
          :
          <TableListReport/>
        }
      </div>
    </div>
  );
};

export default Table;
