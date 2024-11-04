import React, { useState } from "react";

import ContainerWithBordes from "../../../globals/containerWithBordes";

import styles from "./styles.module.css";
import CreateButton from "../../../globals/buttons/createButton";
import GridCard from "../../../globals/gridCard";

interface IProps {
    onSelect: () => void;
}

export default function ListTimeline({ onSelect }: IProps) {

    return (
        <>
            <ContainerWithBordes
                className={[styles.containerWithBordes].join(" ")}
            >
                <div>
                    <h1>Cronograma</h1>
                    <p>Área de trabalho - Seus cronogramas recentes estão aqui:</p>
                </div>

                <CreateButton/>
            </ContainerWithBordes>

            <GridCard
                onSelect={() => onSelect()}
                data={[
                    { title: "Cronograma Jan 2024", date: "02/01/2024" },
                    { title: "Cronograma Jan 2024", date: "02/01/2024" },
                    { title: "Cronograma Jan 2024", date: "02/01/2024" },
                    { title: "Cronograma Jan 2024", date: "02/01/2024" },
                ]}
            />
        </>
    )
}