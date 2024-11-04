import React from "react";

import styles from "./styles.module.css"

interface IProps {
    onSelect: () => void
    data: Array<{ title: string, date: string }>
}

export default function GridCard({ onSelect, data } :IProps) {

    return (
        <div className={styles.gridCard}>
            {
                data.map(({ title, date }, key) => {
                    return (
                        <div key={key} className={[styles.card].join(" ")}>
                            <button className={[styles.buttonInfos].join(" ")}> <img src="/icons/dots.svg" alt="" /> </button>
                            <h3><img src="/icons/strategic/canvas/artboard.svg" alt="" /> {title}</h3>

                            <p>
                                <a onClick={() => onSelect()} href={"#"}> <img src="/icons/open.svg" alt="" /> Abrir </a>
                                <span>Criado {date}</span>
                            </p>
                        </div>

                    )
                })
            }
        </div>
    )
}