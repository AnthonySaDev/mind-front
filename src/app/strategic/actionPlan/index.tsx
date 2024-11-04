import React, { useState } from "react";

import styles from "./styles.module.css";
import Header from "../../../componets/globals/header";
import Search from "../../../componets/globals/inputs/search";
import SubMenu from "../../../componets/globals/menus/subMenu";
import BackButton from "../../../componets/globals/buttons/backButton";
import ContainerWithBordes from "../../../componets/globals/containerWithBordes";
import AddNewTaskButton from "../../../componets/globals/buttons/addNewTask";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import CardChart from "../../../componets/strategic/chart/card";

import { IDataActionPlan, dataActionPlan } from './data';



export default function ActionPlan() {
    const usenavigate = useNavigate();

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        easing: "linear"
    };


    return (
        <div className={[styles.container, "w-full flex f-column padding-b-64"].join(" ")}>
            <Header
                title="Bem vindo, Mind Gestão!"
                showPrintOutButton={false}
            />

            <Search/>
            <SubMenu/>

            <BackButton onClick={() => usenavigate("/actionPlan")}/>

            <ContainerWithBordes className={["bg-white flex space-between align-items margin-b-32"].join(" ")}>
                <div>
                    <h1> Plano de ação </h1>
                    <p> Área de trabalho - Suas pastas de checklists recentes estão aqui: </p>
                </div>
                
                <AddNewTaskButton title="Criar novo"/>
            </ContainerWithBordes>

            {/* <Slider  {...settings}  className={[styles.slider].join(" ")}>
                {dataActionPlan.map(({ date, href, title }: IDataActionPlan, key) => {
                    return (
                        <CardChart
                            className={"margin-r-16"}
                            key={key}
                            date={date}
                            title={title}
                            onClick={() => usenavigate(`/strategic/actionPlan/open/${href}`)}
                        />
                    )
                })}
            </Slider>  */}



        </div>
    )
}
