import React from "react";

import styles from "./styles.module.css";

interface IProps {
    className?: string;
}

export default function BuildingDev({ className }: IProps) {
    return (
        <div className={[
            "w-full flex justify-content-center align-items",
            styles.container, className
        ].join(" ")}>
            <h1 className={["color-blue"].join(" ")}> Em contrução </h1>
        </div>
    )
}