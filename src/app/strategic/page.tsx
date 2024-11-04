import { useNavigate } from "react-router-dom";
import ContainerWithBordes from "../../componets/globals/containerWithBordes";
import Header from "../../componets/globals/header";
import Search from "../../componets/globals/inputs/search";
import SubMenu from "../../componets/globals/menus/subMenu";
import styles from "./styles.module.css";
import CardStrategic, { ICardStrategic } from "../../componets/strategic/card";
import { ICardData, listCard } from "./data";
import { useState } from "react";
import Building from "../../layout/building";

export default function Strategic() {
    const navigate = useNavigate();

    const [showAlert, setShowAlert] = useState<boolean>(false);


    return (
        <>
            {showAlert && <Building onClose={() => setShowAlert(false)}/>}

            <div className={[styles.container, "scroll-auto padding-b-64 "].join(" ")}>
                <Header
                    title="Bem vindo, Mind Gestão!"
                    showPrintOutButton={false}
                />

                <Search/>
                <SubMenu/>

                <ContainerWithBordes className={["bg-white margin-b-32"].join(" ")}>
                    <h1> Ferramentas Estratégicas </h1>
                    <p>Aqui estão as principais ferramentas para auxilar na gestão estratégica do seu negócio:</p>
                </ContainerWithBordes>

                <div className={[
                    styles.cardGrid,
                    "grid"
                ].join(" ")}>
                    {listCard.map(({ title, text, imgSrc, href ,finished }: ICardData, key) => {
                        return (
                            <CardStrategic      
                                key={key}
                                title={title}
                                text={text}
                                imgSrc={imgSrc}
                                finished={finished}
                                onClick={() => navigate(href)}
                            />
                        )
                    })}
                </div>
            </div>
        </>
    )
}