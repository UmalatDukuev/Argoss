import styles from './Notice.module.css';
import React, { useState, useEffect } from 'react';
import { RouteProps } from 'react-router';

const NoticePopUp: React.FC<RouteProps> = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={`${styles.noticePopup} ${isVisible ? styles.visible : styles.notVisible}`}>

      <div className={styles.notification}>
        <div className={styles.notificationIconText}>
        <div className={styles.notificationIcon}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 21.5C17.2467 21.5 21.5 17.2467 21.5 12C21.5 6.7533 17.2467 2.5 12 2.5C6.7533 2.5 2.5 6.7533 2.5 12C2.5 17.2467 6.7533 21.5 12 21.5Z" fill="#FFE3E3" stroke="#F86A6A"/>
          <path d="M14.4749 8.11077C14.8654 7.72024 15.4986 7.72024 15.8891 8.11077C16.2796 8.50129 16.2796 9.13446 15.8891 9.52498L9.52513 15.8889C9.1346 16.2795 8.50144 16.2795 8.11091 15.8889C7.72039 15.4984 7.72039 14.8653 8.11091 14.4747L14.4749 8.11077Z" fill="#CF1124"/>
          <path d="M15.8891 14.4747C16.2796 14.8653 16.2796 15.4984 15.8891 15.8889C15.4986 16.2795 14.8654 16.2795 14.4749 15.8889L8.11091 9.52498C7.72039 9.13446 7.72039 8.50129 8.11091 8.11077C8.50144 7.72024 9.1346 7.72024 9.52513 8.11077L15.8891 14.4747Z" fill="#CF1124"/>
        </svg>
        </div>
        </div>
         <span className={styles.notificationText}>Не удалось загрузить шаблон отчета</span>
      </div>
    </div>
  );
};

export default NoticePopUp;