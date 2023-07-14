import React from 'react';
import styles from "./lexa2.module.scss"
import copy from "../lexa2/copy.svg";
import cut from "../lexa2/cut.svg";
import ddelete from "../lexa2/delete.svg";
import paste from "../lexa2/Paste.svg";
import rename from "../lexa2/rename.svg";

const Lexa2 = () => {
    return (
        <div className={styles.modal}>
            <div className={styles.modalLogo}>
                <img src={rename} alt="f5" className={styles.modal__img}/>
                <button className={styles.modalButton}> Переименовать</button>
            </div>
            <hr className={styles.line}/>
            <div className={styles.modalLogo}>
                <img src={copy} alt="f5" className={styles.modal__img}/>
                <button className={styles.modalButton}> Скопировать</button>
            </div>
            <div className={styles.modalLogo}>
                <img src={cut} alt="f5" className={styles.modal__img}/>
                <button className={styles.modalButton}> Вырезать</button>
            </div>
            <div className={styles.modalLogo}>
                <img src={paste} alt="f5" className={styles.modal__img}/>
                <button className={styles.modalButton}> Вставить</button>
            </div>
            <hr className={styles.line}/>
            <div className={styles.modalLogo}>
                <img src={ddelete} alt="f5" className={styles.modal__img}/>
                <button className={styles.modalButtonRed}> Удалить</button>
            </div>
        </div>
    );
};

export default Lexa2;