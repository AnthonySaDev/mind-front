import React from "react";

import styles from "./styles.module.css";

import Header from "../../componets/globals/header";
import DashboardIndicators from "../../componets/dashboard/indicators";
import DashboardFinance from "../../componets/dashboard/finance";
import SubMenu from "../../componets/globals/menus/subMenu";
import Search from "../../componets/globals/inputs/search";

export default function Dashboard() {


    return (
        <div className={[styles.dashboard, "scroll-y-auto"].join(" ")}>
            <Header
                title="Bem vindo, Mind Gestão!"
            />


            <Search/>
            <SubMenu/>

            <DashboardIndicators/>
            <DashboardFinance/>
        </div>
    );
}