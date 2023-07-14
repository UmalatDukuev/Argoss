import React, {FC} from 'react';
import UploadFile from "../UploadFile/UploadFile";
import classes from "./UploadFileList.module.scss";

interface UploadFileListProps {
    files: File[];
}
const UploadFileList: FC<UploadFileListProps> = ({files}) => {
    return (
        <div className={classes.uploadFileList}>
            {files.map(file =>
            <UploadFile key={file.lastModified} name={file.name} size={file.size}/>)}
        </div>
    );
};

export default UploadFileList;