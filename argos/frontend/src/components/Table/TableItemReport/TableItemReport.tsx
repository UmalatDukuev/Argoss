import React from 'react';
import classes from './TableItemReport.module.scss';

const TableItemReport = () => {
  return (
    <div className={classes.report}>
      <input type='checkbox' className={classes.report__check} />
      <div className={classes.report__block}>
        <p>Test Name Report</p>
      </div>
      <div className={classes.report__block}>
        <p>Test Date Report</p>
      </div>
    </div>
  );
};

export default TableItemReport;