import React, { Dispatch, FC, useState } from 'react';
import classes from './SideBarLayout.module.scss';
import logo from '../../assets/Logo.svg';
import chalonLogo from '../../assets/Tech_map.svg';
import employeeLogo from '../../assets/Equal.svg';
import { ReactComponent as OpenIcon } from '../../assets/barOpen.svg';
import profileIcon from '../../assets/Avatar.svg';
import { SidebarButton } from '../UI/Button/Button';
import clsx from 'clsx';
import { Outlet } from 'react-router-dom';

interface SideBarLayoutProps {
  page: boolean;
  setPage: Dispatch<React.SetStateAction<boolean>>
}

const SideBarLayout: FC<SideBarLayoutProps> = ({page, setPage}) => {
  const [open, setOpen] = useState(false);
  const handlePage0 = () => {
    setPage(false);
  };
  const handlePage1 = () => {
    setPage(true);
  };
  const handleClickOpen = () => {
    setOpen((prevState) => !prevState);
  };


  return (
    <div className={classes.wrapper}>
      <div className={clsx(classes.sideBar, open && classes.open__sidebar)}>
        <div className={classes.sideBar__logoBlock}>
          <div className={classes.sideBar__logo}>
            <img src={logo} alt='logo' />
          </div>
          {open ? <p className={classes.open__logo}>Multi-D</p> : ''}
        </div>
        <div className={classes.sideBar__btnBlock}>
          <SidebarButton className={clsx(page && classes.color)} onClick={handlePage1} image={chalonLogo} open={open}
                         text={'Шаблоны отчетов'} />
          <SidebarButton className={clsx(page || classes.color)} onClick={handlePage0} image={employeeLogo} open={open}
                         text={'Сотрудники'} />
        </div>
        <div className={classes.sideBar__buttomBlock}>
          <SidebarButton image={profileIcon} text={'Лариска Ивановна'} open={open} />

          <SidebarButton onClick={handleClickOpen} className={classes.open__btn} text={'Свернуть меню'} open={open}>
            <OpenIcon />
          </SidebarButton>
        </div>
      </div>
      <Outlet/>
    </div>
  );
};

export default SideBarLayout;