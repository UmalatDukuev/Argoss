import React, { FC, useId, useState } from 'react';
import InputForMain from '../UI/Input/InputForMain';
import searchIcon from '../../assets/Search.svg';
import arrowIcon from '../../assets/ArrowDown.svg';
import { ReactComponent as AddIcon } from '../../assets/Add.svg';
import classes from './Toolbar.module.scss';
import AddEmployee from '../AddEmployee/AddEmployee';
import ModalCard from '../UI/ModalCard/ModalCard';
import UploadTemplate from '../UploadTemplate/UploadTemplate';

interface ToolbarProps {
  page: boolean;
}

const Toolbar: FC<ToolbarProps> = ({ page }) => {
  const [modalActive, setModalActive] = useState(false);
  const id = useId();
  const handleClickOpenModal = () => {
    setModalActive(true);
  };

  const fakeHandler = () => {
  };
  return (<>
      {!page ? (
        <div className={classes.toolbar}>
          <div className={classes.toolbar__buttonBlock}>
            <button className={classes.toolbar__button} onClick={handleClickOpenModal}>
              <AddIcon className={classes.toolbar__add} />
            </button>

          </div>
          <div className={classes.toolbar__dash}></div>
          <InputForMain />
          <div className={classes.toolbar__dash}></div>
          <div className={classes.toolbar__inputBlock}>
            <img className={classes.toolbar__search} src={searchIcon} alt='searchIcon' />
            <input type='text' className={classes.toolbar__input} placeholder='Подразделение' />
            <img className={classes.toolbar__arrow} src={arrowIcon} alt='arrowIcon' />
          </div>
          <div className={classes.toolbar__dash}></div>
          <div className={classes.toolbar__inputBlock}>
            <img className={classes.toolbar__search} src={searchIcon} alt='searchIcon' />
            <input type='text' className={classes.toolbar__input} placeholder='Руководитель' />
            <img className={classes.toolbar__arrow} src={arrowIcon} alt='arrowIcon' />
          </div>
          <ModalCard title={'Добавить сотрудника'} modalActive={modalActive} setModalActive={setModalActive}
                     variant={'long'} styleButton={[{
            text: 'Создать',
            buttonColor: 'grey',
          }, { text: 'Отменить', buttonColor: 'grey', border: true }]} id={id}
                     handlerButton={[fakeHandler]}>
            <AddEmployee id={id} />
          </ModalCard>
        </div>) : (
        <div className={classes.toolbar}>
          <div className={classes.toolbar__buttonBlock}>
            <button className={classes.toolbar__button} onClick={handleClickOpenModal}>
              <AddIcon className={classes.toolbar__add} />
            </button>

          </div>
          <ModalCard title={'Загрузить шаблон отчета'} modalActive={modalActive} setModalActive={setModalActive}
                     variant={'square'} styleButton={[{
            text: 'Добавить',
            buttonColor: 'violet',
          }, { text: 'Отменить', buttonColor: 'grey' }]}>
            <UploadTemplate />
          </ModalCard>
        </div>
      )}
    </>

  );
};

export default Toolbar;