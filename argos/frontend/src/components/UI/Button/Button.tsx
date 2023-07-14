import React, { FC, HTMLAttributes } from 'react';
import clsx from 'clsx';
import classes from './Button.module.scss';

interface BaseButtonProps extends HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  id?: string;
}


export const BaseButton: FC<BaseButtonProps> = ({ children, className, disabled = false, id, ...props }) => {
  return (
    <button disabled={disabled} form={id}
            className={clsx(classes.baseBtn, disabled && classes.baseBtn__disabled, className)} {...props}>
      {children}
    </button>
  );
};

interface SideBarButtonProps extends BaseButtonProps {
  image?: string;
  open?: boolean;
  text?: string;
  buttonColor?: 'violet';

}

const sideBarBtnColor = {
  violet: classes.sideBarBtn__buttonViolet,
};
export const SidebarButton: FC<SideBarButtonProps> = ({
                                                        image = '',
                                                        children,
                                                        open,
                                                        text,
                                                        buttonColor = 'violet',
                                                        ...props
                                                      }) => {
  return (
    <BaseButton
      className={clsx(classes.nullBtn, sideBarBtnColor[buttonColor])} {...props}>
      {!image ? (
        <div className={classes.sideBar__button}>
          {children}
          {open ? <p className={classes.sideBar__text}>{text}</p> : ''}
        </div>
      ) : (
        <div className={clsx(classes.sideBar__Btn, open && classes.sideBar__open)}>
          <div className={classes.sideBar__img}>
            <img src={image} alt='btnLogo' />
          </div>
          {children}

          {open ? <p className={classes.sideBar__text}>{text}</p> : ''}
        </div>
      )}
    </BaseButton>
  );
};

export interface ModuleButtonProps extends BaseButtonProps {
  text?: string;
  buttonColor?: 'grey' | 'red' | 'violet' | 'redText';
  border?: boolean;
}

const moduleBtnColor = {
  grey: classes.moduleBtn__buttonGrey,
  violet: classes.moduleBtn__buttonViolet,
  red: classes.moduleBtn__buttonRed,
  redText: classes.moduleBtn__redText,
};

export const ModuleButton: FC<ModuleButtonProps> = ({
                                                      text,
                                                      buttonColor = 'grey',
                                                      border = false,
                                                      ...props
                                                    }) => {
  return (
    <BaseButton
      className={clsx(
        classes.commonBtn,
        classes.moduleBtn,
        moduleBtnColor[buttonColor],
        border && classes.moduleBtn__border,
      )}
      {...props}>
      <p className={classes.moduleBtn__text}>{text}</p>
    </BaseButton>
  );
};
