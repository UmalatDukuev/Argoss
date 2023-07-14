import React, {FC} from 'react';
import classes from "./UploadFile.module.scss";
import {ReactComponent as SuccessIcon} from "../../../assets/successIcon.svg";
import {bytesToKbytes} from "../../../utils/bytesToKbytes";

interface UploadFileProps {
    name: string,
    size: number;
}
const UploadFile: FC<UploadFileProps> = ({name, size}) => {
    return (
        <div className={classes.uploadFile}>
            <SuccessIcon/>
            <div className={classes.uploadFile__col}>
                <div className={classes.uploadFile__name}>{name}</div>
                <div className={classes.uploadFile__size}>{bytesToKbytes(size)} КБ</div>
            </div>
        </div>
    );
};

export default UploadFile;