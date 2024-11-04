import React from "react";
import styles from "./styles.module.css";


interface IProps {
    children: React.ReactNode
    className?: string
}

export default function ContainerWithBordes(props: IProps) {
    return (
        <div className={[styles.container, props.className].join(" ")}>
            {props.children}
        </div>
    )
}