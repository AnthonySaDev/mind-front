import React from "react";

import styles from "./styles.module.css";

export default function Search() {
    return (
        <div className={[styles.search].join(" ")}>
            <input type="text" placeholder="pesquisar" />
            <button><img src="/icons/search.svg" alt="" /></button>
        </div>
    )
}