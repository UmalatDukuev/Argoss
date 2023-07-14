import React, { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import classes from './ModalCard.module.scss';
import clsx from 'clsx';
import { ModuleButton, ModuleButtonProps } from '../Button/Button';

interface ModalCardProps {
  modalActive: boolean;
  setModalActive: Dispatch<SetStateAction<boolean>>;
  variant?: 'wide' | 'long' | 'square' | '';
  title: string;
  styleButton?: ModuleButtonProps[];
  handlerButton?: (() => undefined | void)[];
  children?: ReactNode;
  id?: string;
}

const variantStyle = {
  wide: classes.modalCard__wide,
  long: classes.modalCard__long,
  square: classes.modalCard__square,
};
const ModalCard: FC<ModalCardProps> = ({
                                         modalActive,
                                         setModalActive,
                                         variant = '',
                                         title,
                                         styleButton = [],
                                         handlerButton = [],
                                         id,
                                         children,
                                       }) => {
  const handleClickCloseDefault = () => {
    setModalActive(false);
  };
  if (modalActive) {
    return (
      <div onClick={() => setModalActive(false)} className={classes.modal}>
        <div onClick={(e) => e.stopPropagation()} className={clsx(classes.modalCard, variant && variantStyle[variant])}>
          <div className={classes.modalCard__header}>
            <h3 className={classes.modalCard__title}>{title}</h3>
            {/*<CloseIcon onClick={() => setModalActive(!modalActive)} className={classes.modalCard__closeIcon} />*/}
          </div>
          `
          <div className={classes.container}>
            {children}
          </div>
          <div className={classes.modalCard__footer}>
            <div className={classes.modalCard__mainButton}>

              <ModuleButton {...styleButton[0]} onClick={() => handlerButton[0]()} id={id} />
              {handlerButton[1] ? <ModuleButton {...styleButton[1]} onClick={() => handlerButton[1]()} /> :
                <ModuleButton {...styleButton[1]} onClick={handleClickCloseDefault} />}

            </div>
            {styleButton[2] !== undefined &&
              <ModuleButton {...styleButton[2]} onClick={() => handlerButton[2]()} />}
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default ModalCard;