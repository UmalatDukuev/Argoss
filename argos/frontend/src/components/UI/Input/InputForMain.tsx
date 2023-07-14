import React from 'react';
import classes from '../../Toolbar/Toolbar.module.scss';
import searchIcon from '../../../assets/Search.svg';

const InputForMain = () => {
  return (
    <div className={classes.toolbar__inputBlock}>
      <img className={classes.toolbar__search} src={searchIcon} alt='searchIcon' />
      <input type='text' className={classes.toolbar__input} placeholder='ФИО' />
    </div>
  );
};

export default InputForMain;