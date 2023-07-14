import React, { useRef, useState } from 'react';
import classes from './UploadTemplate.module.scss';
import { ReactComponent as CloudIcon } from '../../assets/cloudIcon.svg';
import clsx from 'clsx';
import EmptyUpload from './EmptyUpload/EmptyUpload';
import UploadFileList from './UploadFileList/UploadFileList';

const UploadTemplate = () => {
  const [drag, setDrag] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const filePicker = useRef<HTMLInputElement>(null);
  const dragStartOrOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log(123);
    setDrag(true);
  };
  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(false);
  };
  const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setUploadFiles([...files, ...uploadFiles]);
    console.log(files);
    /*const formData = new FormData();
    files.forEach(file => {
        formData.append(`${file.name}`, file)
    })*/

    setDrag(false);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = Array.from(e.target.files ? e.target.files : []);
    setUploadFiles([...files, ...uploadFiles]);
    console.log(files);
  };
  const handlePicker = () => {
    filePicker.current?.click();
  };

  return (
    <div className={classes.uploadTemplate}>
      {drag ?
        <div className={clsx(classes.dropArea, classes.dropArea_active)}
             onDragStart={e => dragStartOrOverHandler(e)}
             onDragLeave={e => dragLeaveHandler(e)}
             onDragOver={e => dragStartOrOverHandler(e)}
             onDrop={e => dropHandler(e)}
        >
          <CloudIcon />
          <div className={classes.dropArea__text}>Отпустите для начала загрузки...</div>
        </div>
        :
        <div className={classes.dropArea}
             onDragStart={e => dragStartOrOverHandler(e)}
             onDragLeave={e => dragLeaveHandler(e)}
             onDragOver={e => dragStartOrOverHandler(e)}
        >
          <CloudIcon />
          <div className={classes.dropArea__text}>Перетащите или <span onClick={handlePicker}>выберите текст</span>
          </div>
          <input ref={filePicker} className={classes.hidden} type='file' multiple accept='.pdf,.doc'
                 onChange={e => handleInput(e)} />
        </div>
      }
      {uploadFiles.length === 0 ?
        <EmptyUpload />
        :
        <UploadFileList files={uploadFiles} />
      }
    </div>
  );
};
export default UploadTemplate;