import React from "react";


import styles from "./styles.module.css";
import CompactedButtonDefault from "../compactedButtonDefault";

interface IProps {
    title?: string;
    onClick?: () => void;
}

export default function AddNewTaskButton({ onClick, title }: IProps) {
    return (
        <CompactedButtonDefault 
            title={title ? title : "Adicionar tarefa"}
            imgSrc="/icons/more.svg"
            className={[styles.buttonAddNewTaks].join(" ")}
            onClick={onClick}
        />
    )
}