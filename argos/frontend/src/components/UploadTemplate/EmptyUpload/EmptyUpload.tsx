import React from 'react';
import classes from "./EmptyUpload.module.scss";
import {ReactComponent as DocIcon} from "../../../assets/docIcon.svg";


const EmptyUpload = () => {
    return (
        <div className={classes.emptyUpload}>
            <DocIcon/>
            <div className={classes.emptyUpload__text}>Upload or select import file.</div>
        </div>
    );
};

export default EmptyUpload;