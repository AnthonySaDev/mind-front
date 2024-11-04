import React from "react"

import styles from "./styles.module.css";

interface IProps {
    imgSrc?: string;
    title: string;
    className?: string;
    onClick?: () => void;
}

export default function CompactedButtonDefault({ title, className, imgSrc, onClick }: IProps) {
    return (
        <button 
            onClick={() =>  onClick ? onClick() : null}
            className={[styles.button, className].join(" ")}
        >
            {/* {imgSrc && <img src={imgSrc} alt="" />} */}
            {title}
        </button>
    )
}