import React from "react";

import styles from "./styles.module.css";
import Header from "../../../../componets/globals/header";
import Search from "../../../../componets/globals/inputs/search";
import SubMenu from "../../../../componets/globals/menus/subMenu";
import BackButton from "../../../../componets/globals/buttons/backButton";
import { useNavigate } from "react-router-dom";
import BuildingDev from "../../../../componets/globals/dev/building";

export default function ChartOpen() {
    const usenavigate = useNavigate();

    return (
        <div className={[styles.container, "w-full"].join(" ")}>
            <Header
                title="Bem vindo, Mind Gestão!"
                showPrintOutButton={false}
            />

            <Search/>
            <SubMenu/>

            <BackButton onClick={() => usenavigate("/strategic/chart")}/>

            <BuildingDev className="margin-t-32 "/>

        </div>
    )
}