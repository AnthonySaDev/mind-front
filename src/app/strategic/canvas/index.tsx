import React, { useEffect, useState } from "react";

import Header from "../../../componets/globals/header";
import Search from "../../../componets/globals/inputs/search";
import SubMenu from "../../../componets/globals/menus/subMenu";

import styles from "./styles.module.css";
import "./stylesSlide.css";

import { dataCanvas, IDataCanvas } from "./data";
import CardChart from "../../../componets/strategic/chart/card";
import { useNavigate } from "react-router-dom";
import ContainerWithBordes from "../../../componets/globals/containerWithBordes";
import AddNewTaskButton from "../../../componets/globals/buttons/addNewTask";
import BackButton from "../../../componets/globals/buttons/backButton";
import { axiosConfig } from "../../../ultils/axios";
import { ICanvas } from "./IType";
import Slider from "react-slick";

import { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';

export default function Canvas() {
    const usenavigate = useNavigate();
    const [dataList, setDataList] = useState<ICanvas[]>([]);
    const [title, setTitle] = useState<string>("");

    useEffect(() => {
        loadData();
    }, []); 

    async function loadData(): Promise<void> {
        try {
            const { data } = await axiosConfig("/canvas");
            setDataList(data.data.list)
        }catch(e) {
            console.error(e);
        }
    }
    

    async function create(): Promise<void> {
        try {
            const { data } = await axiosConfig("/canvas", {
                method: "POST",
                data: {
                    label: title
                }
            });


            loadData();
        }catch(e) {
            console.error(e);
        }
    }

    const [emblaRef, emblaApi] = useEmblaCarousel({ dragFree: true })

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        easing: "linear"
    };

    return (
        <div className={[styles.container].join(" ")}>
            <Header
                title="Bem vindo, Mind Gestão!"
                showPrintOutButton={false}
            />

            <Search/>
            <SubMenu/>

            <BackButton onClick={() => usenavigate("/strategic")}/>

            <ContainerWithBordes className={["bg-white margin-b-32"].join(" ")}>
                <div>
                    <h1> Canvas </h1>
                    <p> Área de trabalho - Seus quadros recentes estão aqui: </p>
                </div>
                
                <div className={["flex space-between", styles.create].join(" ")}>
                    <input onChange={e => setTitle(e.currentTarget.value)} type="text" placeholder="Título" />
                    <AddNewTaskButton onClick={create} title="Criar novo"/>
                </div>
            </ContainerWithBordes>

            {/* <Slider  {...settings}  className={[styles.slider].join(" ")}>
                {dataList.map(({ createdAt, id, label, updatedAt }: ICanvas, key) => {
                    return (
                        <CardChart
                            key={key}
                            date={"date"}
                            title={label.length >= 10 ? `${label.slice(0, 10)}...` : label}
                            onClick={() => usenavigate(`/strategic/canvas/open/${id}`)}
                        />
                    )
                })}
            </Slider>  */}

            <div className="embla">
                <div className="embla__viewport" ref={emblaRef}>
                    <div className="embla__container">
                        {dataList.map(({ createdAt, id, label, updatedAt }: ICanvas, key) => {
                            return (
                                <div className="embla__slide" key={key}>
                                    <div className="embla__slide__number">
                                        <CardChart
                                            key={key}
                                            date={"date"}
                                            className={[styles.card].join(" ")}
                                            title={label.length >= 10 ? `${label.slice(0, 10)}...` : label}
                                            onClick={() => usenavigate(`/strategic/canvas/open/${id}`)}
                                        />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}