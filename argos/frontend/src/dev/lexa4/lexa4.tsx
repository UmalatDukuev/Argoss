import React from 'react';
import classes from './lexa4.module.scss';
import closeIcon from './closeicon.svg';


const Lexa4 = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.moduleHeader}>
        <h1 className={classes.bigString}>Карточка сотрудника</h1>
        <button className={classes.buttonX}><img src={closeIcon} alt='f5' /></button>
      </div>
      <hr className={classes.line} />

      <div className={classes.moduleFooter}>
        <div className={classes.moduleBtn}>
          <button className={classes.button1}>Редактировать</button>
          <button className={classes.button2}>Отменить</button>
        </div>
        <button className={classes.button3}>Удалить</button>
      </div>
    </div>
  );
};

export default Lexa4;