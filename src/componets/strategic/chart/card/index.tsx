import React, { useState } from "react";

import styles from "./styles.module.css"

interface IProps {
    imgSrc?: string;
    title: string;
    date: string;
    onClick?: () => void;
    clickMore?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;

    className?: string;

    onClickCalendar?: () => void;
    onClickKanban?: () => void;

    onDelete?: () => void;
    onUpdate?: () => void;
}

// types of element exported
export type ICardChart = IProps;

export default function CardChart({ title, onClick, onClickCalendar, onClickKanban, date, className, onUpdate, onDelete } :IProps) {
    const [show, setShow] = useState<boolean>(false);

    return (
        <div className={[styles.card, className].join(" ")}>
            <button onClick={e => setShow(!show)} className={[styles.buttonInfos].join(" ")}> <img src="/icons/dots.svg" alt="" /> </button>
            <h3 title={title}><img src="/icons/strategic/icon-chart.svg" alt="" /> {title} </h3>
            
            {show && <div className={styles.options}>
                <button onClick={() => {onDelete && onDelete(); setShow(false)}} className={styles.buttonDelete}>delete</button>
                <button onClick={() => {onUpdate && onUpdate(); setShow(false)}} className={styles.buttonEdit}>editar</button>
            </div>}

            <p className={styles.links}>
                <a onClick={(e) => onClickCalendar ? onClickCalendar() : null}> <img src="/icons/open.svg" alt="" /> Abrir - Cronograma </a>
                <a onClick={(e) => onClickKanban ? onClickKanban() : null}> <img src="/icons/open.svg" alt="" /> Abrir - Kanban </a>
                <span>{date}</span>
            </p>
        </div>
    )
}