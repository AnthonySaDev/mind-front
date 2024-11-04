import React, { useState } from "react";

import ContainerWithBordes from "../../globals/containerWithBordes"

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


import styles from "./styles.module.css";


export default function DashboardIndicators() {
    const [data, setData] = useState([
        {
            label: "Ticket Médio",
            value: "34",
            link: "#",
            roseValue: "4",
            rose: true
        },
        {
            label: "Faturamento",
            value: "800",
            link: "#",
            roseValue: "4",
            rose: false
        },
        {
            label: "CAC",
            value: "20",
            link: "#",
            roseValue: "4",
            rose: false
        },
        {
            label: "Custo Médio",
            value: "112",
            link: "#",
            roseValue: "4",
            rose: true
        },
        {
            label: "Taxa de conversão",
            value: "80",
            link: "#",
            roseValue: "4",
            rose: false
        },
        
    ]);

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        swipeToSlide: false,
        responsive: [
            {
              breakpoint: 1380,
              settings: {
                slidesToShow: 3,
              }
            },
            {
              breakpoint: 1180,
              settings: {
                slidesToShow: 2,
              }
            },
            {
                breakpoint: 980,
                settings: {
                  slidesToShow: 1,
                }
            }
        ]
    };

    return (
        <ContainerWithBordes>
            <h1> Indicadores <img src="/icons/circleWithArrow.svg" alt="" /> </h1>
            <p>Os indicadores abaixo correspondem ao mês atual, esses dados podem mudar conforme alimentações futuras.</p>

            <div className={[styles.row].join(" ")}>
                <Slider {...settings}> 
                    {data.map(({ label, link, rose, value, roseValue }, key) => {
                        return (
                            <div id={`${key}`} key={key} className={[styles.col].join(" ")}>
                                <h2> { label } </h2>
                                <h3>R${value}</h3>
                                <p>
                                    <a href={link}> Ver detalhes </a> 
                                    <span> {rose ? "subiu" : "desceu"} {roseValue} </span> 
                                </p>
                            </div>
                        )
                    })}
                </Slider>
            </div>
        </ContainerWithBordes>
    )
}