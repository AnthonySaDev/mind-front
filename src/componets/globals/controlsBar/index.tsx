
import React from "react";

import PrintOutButton from "../../../componets/globals/buttons/printOutButton";
import DateAndMonth from "../../../componets/globals/selects/dateAndMonth";

import styles from "./styles.module.css";
import ContainerWithBordes from "../containerWithBordes";


interface IProps {
    children: React.ReactNode[] | React.ReactNode,
    className?: string
}

function ControlsBar({ children,className }: IProps) {
    return (
        <ContainerWithBordes className={[styles.container, className].join(" ")}>


            {children}

        </ContainerWithBordes>
    )
}

export default ControlsBar;

