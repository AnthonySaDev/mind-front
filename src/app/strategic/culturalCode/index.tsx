
import React, { useEffect, useState } from "react";

import styles from "./styles.module.css";

import Header from "../../../componets/globals/header";
import SubMenu from "../../../componets/globals/menus/subMenu";
import Card_AboutCompany_CulturalCode from "../../../componets/strategic/culturalCode/aboutCompany/card";
import Card_AboutCompany_CulturalCodeLoad from "../../../componets/strategic/culturalCode/aboutCompany/cardLoad";
import BackButton from "../../../componets/globals/buttons/backButton";

import { useNavigate } from "react-router-dom";
import { axiosConfig } from "../../../ultils/axios";
import ContainerWithBordes from "../../../componets/globals/containerWithBordes";
import AddNewTaskButton from "../../../componets/globals/buttons/addNewTask";

export default function CulturalCodeStrategic() {
    const usenavigate = useNavigate();

    const [data, setDate] = useState<Array<any> | undefined>();
    const [title, setTitle] = useState<string>("");

    useEffect(() => {
        load();
    }, []);

    async function load() {
        try {
            const { data } = await axiosConfig("/culturalCode");
    
            setDate(data.data.data)
        }catch(e) {
            console.error(e);
        }
    }

    async function create() {
        try {
            await axiosConfig("/culturalCode", {
                method: "POST",
                data: { label: title }
            });

            load();
        }catch(e) {
            console.error(e);
        }
    }

    return (
        <div className={[styles.container, "scroll-y-auto w-full"].join(" ")}>
            <Header
                title="Configurações Mind Gestão"
                showPrintOutButton={false}
            />
            
            <SubMenu
                data={[
                    { to: "/", label: "Sobre a empresa" }
                ]}
            />

            <BackButton onClick={() => usenavigate("/strategic")}/>

            <ContainerWithBordes className={["bg-white margin-b-32"].join(" ")}>
                <div className={["flex space-between", styles.create].join(" ")}>
                    <input onChange={e => setTitle(e.currentTarget.value)} type="text" placeholder="Título" />
                    <AddNewTaskButton onClick={create} title="Criar novo"/>
                </div>
            </ContainerWithBordes>
            
            <div className={["w-full", styles.content].join(" ")}>
                {   data 
                    ?   data.map(({ label, id }, key) => {
                            return (
                                <Card_AboutCompany_CulturalCode
                                    label={label}
                                    id={id}
                                />
                            )
                        })
                    :   Array.from(Array(5).keys()).map((key) => {
                            return <Card_AboutCompany_CulturalCodeLoad key={key}/>
                        })
                }

                {}

                
            </div>
                    
        </div>
    )
}