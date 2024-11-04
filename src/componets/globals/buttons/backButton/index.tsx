import React from "react"

import styles from "./styles.module.css";

interface IProps {
    onClick: () => void;
}

export default function BackButton({ onClick }: IProps) {
    return (
        <button 
            onClick={() => onClick()}
            className={[styles.button].join(" ")}
        >
            <img src="/icons/arrow-left.svg" alt="" />
            Voltar
        </button>
    )
}