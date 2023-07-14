import React, { FC } from 'react';
import classes from './Layout.module.scss';
import { Outlet } from 'react-router-dom';

const Layout: FC = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.home__title}>
        <h1>
          Работа с данными о сотрудниках
        </h1>
      </div>
     <Outlet/>
    </div>
  );
};

export default Layout;