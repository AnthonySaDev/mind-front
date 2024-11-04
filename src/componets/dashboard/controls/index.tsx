import React from "react";

import styles from "./styles.module.css";

import PrintOutButton from "../../globals/buttons/printOutButton";

interface IProps {
    showPrintOutButton?: boolean;
}

export default function DashboardControls({ showPrintOutButton = true }: IProps) {
    return (
        <div
        className={[styles.controls].join(" ")}
        >
            {showPrintOutButton && <PrintOutButton/>} 

            <button
                className={[styles.notifications].join(" ")}
            > 
                <img src="/icons/notification.svg" alt="" />
                <img src="/icons/arrow-v2.svg" alt="" />
            </button>

            
            <button
                className={[styles.profile].join(" ")}
            > 
                <img src="/icons/defualt-profile.svg" alt="" />
                <img src="/icons/arrow-v2.svg" alt="" />
            </button>

        </div>
    );
}