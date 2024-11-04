import React from "react"

import styles from "./styles.module.css"

export default function CreateButton() {
    return (
        <button className={[styles.button].join(" ")}>
            <img src="/icons/more.svg" alt="" />
            Criar novo
        </button>
    )
}
