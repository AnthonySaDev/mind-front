import React from "react";

import styles from "./styles.module.css";

import BuildingDev from "../../../../componets/globals/dev/building";
import Header from "../../../../componets/globals/header";
import Search from "../../../../componets/globals/inputs/search";
import SubMenu from "../../../../componets/globals/menus/subMenu";
import { useNavigate } from "react-router-dom";
import BackButton from "../../../../componets/globals/buttons/backButton";
import ContainerWithBordes from "../../../../componets/globals/containerWithBordes";
import AddNewTaskButton from "../../../../componets/globals/buttons/addNewTask";
import FilterButton from "../../../../componets/globals/buttons/filterButton";
import DividerDefault from "../../../../componets/globals/divider/default";

import { data, IData } from "./data";

export default function TimelineOpen() {
    const usenavigate = useNavigate();

    return (
        <div className={["w-full h-full", styles.container].join(" ")}>
            <Header
                title="Bem vindo, Mind Gestão!"
                showPrintOutButton={false}
            />

            <Search/>
            <SubMenu/>

            <BackButton onClick={() => usenavigate("/strategic")}/>

            <ContainerWithBordes className={["bg-white flex space-between align-items margin-b-32"].join(" ")}>
                <div>
                    <h1> Plano de ação - Jan 2024 </h1>
                    <p> <img src="/icons/pencil.svg" alt="" /> Descrição: Checklist de tarefas, referentes a Janeiro de 2024. </p>
                    <p> <img src="/icons/pencil.svg" alt="" /> Responsável: Marcos Silva - P.O </p>
                </div>
                
                <div className={["flex"].join(" ")}>
                    <FilterButton className="margin-r-16"/>
                    <AddNewTaskButton/>
                </div>
            </ContainerWithBordes>

            <DividerDefault/>

            <div className={["flex space-between margin-t-16 align-items"].join(" ")}>
                <ul className={[styles.filters, "flex"].join(" ")}>
                    <li className={[styles.select].join(" ")}>Todos</li>
                    <li>Concluídas</li>
                    <li>Não concluídas</li>
                </ul>

                <div className={[styles.info, "flex"].join(" ")}>
                    <img className="block" src="/icons/strategic/actionPlan/open/chart-pie.svg" alt="" />
                    <p className="margin-l-16"> 25% das tarefas concluídas </p>  
                </div>
            </div>

            
            <div className={["", styles.content].join(" ")}>
                {data.map(({ title, checked, id, text }: IData, key) => {
                    return ( 
                        <div className={[styles.card, "w-full padding-16 flex space-between align-items"].join(" ")} key={key}>
                            <div className={[styles.column].join(" ")}>
                                <h3> <input type="checkbox" defaultChecked={checked}/> {title} </h3>
                                <p> {text} </p>
                            </div>

                            <div className={[styles.controls, "flex"].join(" ")}>
                                <button className="flex"> <img src="/icons/strategic/actionPlan/open/migrate.svg" alt="" />  Migrar </button>
                                <button className="margin-l-16 flex"> <img src="/icons/strategic/actionPlan/open/del.svg" alt="" /> Excluir </button>
                            </div>
                        </div>
                    )
                })}
            </div>

            
            {/* <BuildingDev/> */}
        </div>
    )
}