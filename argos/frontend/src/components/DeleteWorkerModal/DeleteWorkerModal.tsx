import React, { FC } from 'react';
import styles from './DeleteWorkerModal.module.scss';

interface DeleteModalProps {
  name: string;
}

const DeleteWorkerModal: FC<DeleteModalProps> = ({ name }) => {
  return (
    <>
      <div className={styles.base}>
        <div className={styles.Content}>
          <div className={styles.IconHeader}>
            {/*<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32' fill='none'>*/}
            {/*  <path fillRule='evenodd' clipRule='evenodd'*/}
            {/*        d='M32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16ZM25 16C25 20.9706 20.9706 25 16 25C11.0294 25 7 20.9706 7 16C7 11.0294 11.0294 7 16 7C20.9706 7 25 11.0294 25 16Z'*/}
            {/*        fill='#FFE3E3' />*/}
            {/*</svg>*/}
            {/*<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>*/}
            {/*  <path*/}
            {/*    d='M12 21.5C17.2467 21.5 21.5 17.2467 21.5 12C21.5 6.7533 17.2467 2.5 12 2.5C6.7533 2.5 2.5 6.7533 2.5 12C2.5 17.2467 6.7533 21.5 12 21.5Z'*/}
            {/*    fill='white' stroke='#F86A6A' />*/}
            {/*  <path fillRule='evenodd' clipRule='evenodd'*/}
            {/*        d='M12 15C12.5523 15 13 15.4477 13 16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16C11 15.4477 11.4477 15 12 15ZM12 7C12.5523 7 13 7.44772 13 8V12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12V8C11 7.44772 11.4477 7 12 7Z'*/}
            {/*        fill='#CF1124' />*/}
            {/*</svg>*/}
          </div>
          <div className={styles.TextLayout}>
            <p className={styles.FontLayout}>Вы уверены, что хотите удалить данные о “{`${name}`}”?</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteWorkerModal;