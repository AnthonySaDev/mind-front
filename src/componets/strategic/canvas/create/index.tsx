import React, { useEffect, useState } from "react";

import styles from "./styles.module.css";

interface IProps {
    className?: string;
    isActive: boolean;
}

export default function CreateCanvas({ className, isActive }: IProps) {
    const [isActiveDisplay, setIsActiveDisplay] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => {
            setIsActiveDisplay(isActive);
        }, 500)
    }, [isActive]);

    return (
        <div className={[styles.card, isActive && styles.activeD, isActiveDisplay && styles.active, className].join(" ")}>
            <input placeholder="Título" type="text" name="" id="" />
        </div>
    )
}