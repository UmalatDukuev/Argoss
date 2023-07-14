import React, { FC } from 'react';
import classes from './AddEmployee.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ReactComponent as AddIcon } from '../../assets/Add.svg';
import threePoints from '../../assets/threepoints.svg';
import { IEmployeeCard } from '../../types/IEmployeeCard';
import clsx from 'clsx';

interface AddEmployeeProps {
  id: string;
}

const AddEmployee: FC<AddEmployeeProps> = ({ id }) => {

  const { register, handleSubmit, formState: { errors } } = useForm<IEmployeeCard>();
  const onSubmit: SubmitHandler<IEmployeeCard> = (data) => {
    alert(`${data.secondName} ${data.name} ${data.surName} ${data.post} ${data.department}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.contentWrapper} id={id}>
      <div className={classes.moduleInput}>

        <div className={classes.inputRowName}>
          <h2>Фамилия</h2>
          <h2 className={classes.red}>*</h2>
        </div>
        <div className={classes.inputRow}>
          <input {...register('secondName', {
            required: 'Это обязательное поле',
            maxLength: {
              value: 64,
              message: 'Максимальная длина 64',
            },
            pattern: {
              value: /^([a-zA-Zа-яА-ЯёЁ]+)$/,
              message: 'Некорректные данные',
            },
          })}
                 className={clsx(classes.myInput, errors.secondName && classes.myInputRed)} type='text'
                 placeholder='Фамилия' />
          <button className={classes.buttonPoints}><img src={threePoints} alt='f5' /></button>
        </div>
        {errors.secondName && <div className={classes.error}>{errors.secondName.message}</div>}
      </div>
      <div className={classes.moduleInput}>
        <div className={classes.inputRowName}>
          <h2>Имя</h2>
          <h2 className={classes.red}>*</h2>
        </div>
        <div className={classes.inputRow}>
          <input {...register('name', {
            required: 'Это обязательное поле',
            maxLength: {
              value: 64,
              message: 'Максимальная длина 64',
            },
            pattern: {
              value: /^([a-zA-Zа-яА-ЯёЁ]+)$/,
              message: 'Некорректные данные',
            },
          })}
                 className={clsx(classes.myInput, errors.name && classes.myInputRed)}
                 type='text' placeholder='Имя' />
          <button className={classes.buttonPoints}><img src={threePoints} alt='f5' /></button>
        </div>
        {errors.name && <div className={classes.error}>{errors.name.message}</div>}
      </div>
      <div className={classes.moduleInput}>
        <div className={classes.inputRowName}>
          <h2>Отчество</h2>
          <h2 className={classes.red}>*</h2>
        </div>
        <div className={classes.inputRow}>
          <input {...register('surName', {
            required: 'Это обязательное поле',
            maxLength: {
              value: 64,
              message: 'Максимальная длина 64',
            },
            pattern: {
              value: /^([a-zA-Zа-яА-ЯёЁ]+)$/,
              message: 'Некорректные данные',
            },
          })}
                 className={clsx(classes.myInput, errors.surName && classes.myInputRed)}
                 type='text' placeholder='Отчество' />
          <button className={classes.buttonPoints}><img src={threePoints} alt='f5' /></button>
        </div>
        {errors.surName && <div className={classes.error}>{errors.surName.message}</div>}
      </div>
      <div className={classes.moduleInput}>
        <div className={classes.inputRowName}>
          <h2>Должность</h2>
        </div>
        <div className={classes.inputRow}>
          <input {...register('post', {
            maxLength: {
              value: 64,
              message: 'Максимальная длина 64',
            },
            pattern: {
              value: /^([a-zA-Zа-яА-ЯёЁ0-9_/.№#-]+)$/,
              message: 'Некорректные данные',
            },
          })}
                 className={clsx(classes.myInput, errors.post && classes.myInputRed)}
                 type='text' placeholder='Должность' />
          <button className={classes.buttonPoints}><img src={threePoints} alt='f5' /></button>
        </div>
        {errors.post && <div className={classes.error}>{errors.post.message}</div>}
      </div>
      <div className={classes.moduleInput}>
        <div className={classes.inputRowName}>
          <h2>Подразделение </h2>
        </div>
        <div className={classes.inputRow}>
          <input {...register('department', {
            maxLength: {
              value: 64,
              message: 'Максимальная длина 64',
            },
            pattern: {
              value: /^([a-zA-Zа-яА-ЯёЁ0-9_/.№#-]+)$/,
              message: 'Некорректные данные',
            },
          })}
                 className={clsx(classes.myInput, errors.department && classes.myInputRed)} type='text'
                 placeholder='Подразделение' />
          <button className={classes.buttonPoints}><img src={threePoints} alt='f5' /></button>
        </div>
        {errors.department && <div className={classes.error}>{errors.department.message}</div>}
      </div>
      <button className={classes.add__button}>
        <AddIcon className={classes.add__img} />
      </button>
    </form>
  );
};

export default AddEmployee;