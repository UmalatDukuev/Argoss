import React, { FC } from 'react';
import classes from './EmployeeCard.module.scss';
import { IWorker } from '../../types/IWorker';

interface EmployeeCardProps {
  name: string;
  department: string;
  occupation: string;
  other_info: object;
}

const EmployeeCard: FC<EmployeeCardProps> = (employee) => {
  return (
    <div className={classes.contentWrapper}>
      <div className={classes.moduleInfo}>
        <h2 className={classes.infoName}>ФИО</h2>
        <h2 className={classes.info}>{employee.name}</h2>
      </div>
      <div className={classes.moduleInfo}>
        <h2 className={classes.infoName}>Подразделение</h2>
        <h2 className={classes.info}>{employee.department}</h2>
      </div>
      <div className={classes.moduleInfo}>
        <h2 className={classes.infoName}>Должность</h2>
        <h2 className={classes.info}>{employee.occupation}</h2>
      </div>
    </div>
  );
};

export default EmployeeCard;