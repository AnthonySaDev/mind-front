import { useNavigate } from "react-router-dom";
import AddNewTaskButton from "../../../componets/globals/buttons/addNewTask";
import BackButton from "../../../componets/globals/buttons/backButton";
import ContainerWithBordes from "../../../componets/globals/containerWithBordes";
import Header from "../../../componets/globals/header";
import Search from "../../../componets/globals/inputs/search";
import SubMenu from "../../../componets/globals/menus/subMenu";
import styles from "./styles.module.css";
import Slider, { Settings } from "react-slick";

import { IDataTimeLineAndKanbanBoard, dataKanbanBoard, dataTimeLine } from "./data";
import CardChart from "../../../componets/strategic/chart/card";
import { useEffect, useState } from "react";
import { axiosConfig } from "../../../ultils/axios";
import { string } from "zod";

import "./styles.css"
import moment from "moment-timezone";

export default function Timeline() {
    const usenavigate = useNavigate ();

    const settings: Settings = {
        dots: true,
        speed: 200,
        arrows: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        easing: "linear",
        infinite: false,
        // centerMode: true,
    };


    const [cardList, setCardList] = useState<{ label: string, id: number, createdAt: string }[]>([]);
    const [update, setUpdate] = useState<{ label: string, id: number, createdAt: string}>();

    async function loadData(): Promise<void> {
        try {   
            const { data: res } = await axiosConfig("/cronograma");
            console.log(res)
            setCardList([...res.data]);
        }catch(error) {
            console.error(error);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    const [label, setLabel] = useState<string>("");

    async function save(data?: any) {
        try {

            if(!update) {
                await axiosConfig("/cronograma", {
                    method: "POST",
                    data: {
                        label
                    }
                });
            }

            if(update) {
                await axiosConfig(`/cronograma/${update.id}`, {
                    method: "PATCH",
                    data: {
                        label
                    }
                });
            }
            
            setUpdate(undefined);
            loadData();
        }catch(e) { console.error(e) }
    }

    async function deletee(data: any) {
        try {
            console.log(data)
            await axiosConfig(`/cronograma/${data.id}`, {
                method: "delete"
            });

            const index = cardList.indexOf(data);
            if(index > -1) cardList.splice(index, 1);
            setCardList([...cardList]);
            
            loadData();
            setUpdate(undefined);
        }catch(e) { console.error(e) }
    }

    return (
        <div className={[ styles.container, "w-full scroll-y-auto padding-b-64 scroll-x-hidden"].join(" ")}>
            <Header
                title="Bem vindo, Mind Gestão!"
                showPrintOutButton={false}
            />

            <Search/>
            <SubMenu/>

            <BackButton onClick={() => usenavigate("/strategic")}/>

            <ContainerWithBordes className={["bg-white margin-b-32"].join(" ")}>
                <div>
                    <h1> Cronograma </h1>
                    <p> Área de trabalho - Seus cronogramas recentes estão aqui: </p>
                </div>

                <div className={["flex space-between", styles.create].join(" ")}>
                    <input defaultValue={update?.label} onChange={(e) => setLabel(e.currentTarget.value)} type="text" placeholder="Título" />
                    <AddNewTaskButton onClick={() => save()} title={update ? "Atualizar" : "Criar"}/>
                </div>
            </ContainerWithBordes>
                
            <Slider  {...settings} className={[styles.sliderr].join(" ")}>
                {cardList.map((data, key) => {
                    return (
                        <CardChart
                            className={[
                                data.id === update?.id && styles.select
                            ].join(" ")}
                            key={key}
                            date={moment(data.createdAt).format("DD/MM/YYYY")}
                            title={data.label}
                            
                            onDelete={() => deletee(data)}
                            onUpdate={() => setUpdate(data)}

                            onClickCalendar={() => usenavigate(`/strategic/timeline/calendar/open/${data.id}`)}
                            onClickKanban={() => usenavigate(`/strategic/timeline/kanbanBoard/open/${moment(data.createdAt).format("DD-MM-YYYY")}/${data.id}`)}
                        />
                    )
                })}
            </Slider>

        </div>
    )
}