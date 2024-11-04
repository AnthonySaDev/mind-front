import React from "react";

import styles from "./styles.module.css";
import DashboardControls from "../../dashboard/controls";

interface IProps {
    title: string;
    showPrintOutButton?: boolean;
}

export default function Header({ title, showPrintOutButton } :IProps) {
    return (
        <div className={[styles.header].join(" ")}>
            <h1>{title}</h1>

            <DashboardControls
                showPrintOutButton={showPrintOutButton}
            />
        </div>
    )
}