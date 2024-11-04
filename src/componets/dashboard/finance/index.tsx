import React from "react";

import styles from "./styles.module.css";
import ContainerWithBordes from "../../globals/containerWithBordes"

export default function DashboardFinance() {
    return (
        <ContainerWithBordes className={[styles.container].join(" ")}>
            <h1>Financeiro <img src="/icons/info.svg" alt="" /> </h1>
            <p>O comparativo abaixo, corresponde aos dados alimentados no DRE.</p>

            <div className={[styles.row].join(" ")}>
                <div className={[styles.card].join(" ")}>
                    <h2> <img src="/icons/finance/graphics.svg" alt="" />  Orçamento (Projeção) </h2>

                    <Table
                        className={[styles.budget].join(" ")}
                        head={["Item", "Valor", "Porcentagem"]}
                        body={[
                            ["Receita Bruta", "R$900", "100%"],
                            ["Receita Bruta", "R$900", "100%"],
                            ["Receita Bruta", "R$900", "100%"],
                            ["Receita Bruta", "R$900", "100%"]
                        ]}
                    />
                </div>

                <div className={[styles.card].join(" ")}>
                    <h2> <img src="/icons/finance/accomplished.svg" alt="" />  Realizado </h2>
                    
                    <Table
                        className={[styles.accomplished].join(" ")}
                        head={["Item", "Valor", "Porcentagem"]}
                        body={[
                            ["Receita Bruta", "R$900", "100%"],
                            ["Receita Bruta", "R$900", "100%"],
                            ["Receita Bruta", "R$900", "100%"],
                            ["Receita Bruta", "R$900", "100%"]
                        ]}
                    />
                </div>

                <div className={[styles.card].join(" ")}>
                    <p>Diferença entre <span>RFO</span> e <span>RFR</span></p> 
                    <p>100%</p>
                </div>
            </div>
        </ContainerWithBordes>
    )
}


interface IProps {
    className?: string;
    head: string[]
    body: Array<string[]>
}

function Table({ className, head, body }: IProps) {
    return (
        <table className={[styles.table, className].join(" ")}>
            <thead>
                <tr>
                    {head.map((text, key) => {
                        return (
                            <th key={key}>{text}</th>
                        )
                    })}
                </tr>
            </thead>

            <tbody>
                {body.map((list, key) => {
                    return (
                        <tr key={key}>
                            {list.map((text, key) => {
                                return (
                                    <td key={key}>{text}</td>
                                )
                            })}
                        </tr>

                    )
                })}
            </tbody>
        </table>
    )
}