import React from "react";

import styles from "./styles.module.css";
import CompactedButtonDefault from "../compactedButtonDefault";

interface IProps {
    className?: string;
}

export default function PrintButton({ className }: IProps) {
    return (
        <CompactedButtonDefault
            imgSrc="/icons/printer.svg"
            title="Imprimir"
            className={[styles.printOut, className].join(" ")}
        />
    )
}