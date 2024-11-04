import React from "react";

import styles from "./styles.module.css";

import Header from "../../../componets/globals/header";
import Search from "../../../componets/globals/inputs/search";
import SubMenu from "../../../componets/globals/menus/subMenu";
import ContainerWithBordes from "../../../componets/globals/containerWithBordes";
import GridCard from "../../../componets/globals/gridCard";
import ButtonFilter from "../../../componets/globals/buttons/filterButton";
import PrintButton from "../../../componets/globals/buttons/printOutButton";
import TableCashFlow from "../../../componets/globals/tables/tableCashFlow";
import BackButton from "../../../componets/globals/buttons/backButton";
import { useNavigate } from "react-router-dom";



export default function CashFlow() {
    const navigate = useNavigate();

    return (
        <div className={[styles.container, "scroll-y-auto"].join(" ")}>
            <Header
                title="Bem vindo, Mind Gestão!"
                showPrintOutButton={false}
            />

            <Search/>
            <SubMenu/>

            <BackButton onClick={() => navigate("/financial")}/>

            <ContainerWithBordes className={[styles.containerWithBordes].join(" ")}>
                <div>
                    <h1>Financeiro</h1>
                    <p> <img src="/icons/pencil.svg" alt="" /> Descrição: Aqui tem uma breve descrição editável sobre o fluxo de caixa abaixo.</p>
                    <p> <img src="/icons/pencil.svg" alt="" /> Responsável: Marcos Silva - P.O</p>
                </div>

                <div className="flex">
                    <ButtonFilter/>
                    <PrintButton className={[styles.printButton, "margin-l-16"].join(" ")}/>
                </div>
            </ContainerWithBordes>

            {/* <div className={[styles.tableContainer].join(" ")}> */}
                <TableCashFlow
                    className={[styles.table, "margin-t-32 border-r-8 scroll-hidden"].join(" ")}
                    head={["Data", "Tipo", "Valor", "Descrição", "Observação", "Subtotal/Dia", "Saldo Acumulado"]}
                    body={[
                        ["02/02/24", "Entrada", "R$ 0,00", "Cliente 02", "Boleto", "R$ 0,00", "R$ 0,00"],
                        ["02/02/24", "Entrada", "R$ 0,00", "Cliente 02", "Boleto", "R$ 0,00", "R$ 0,00"],
                        ["02/02/24", "Entrada", "R$ 0,00", "Cliente 02", "Boleto", "R$ 0,00", "R$ 0,00"],
                        ["02/02/24", "Entrada", "R$ 0,00", "Cliente 02", "Boleto", "R$ 0,00", "R$ 0,00"],
                        ["02/02/24", "Entrada", "R$ 0,00", "Cliente 02", "Boleto", "R$ 0,00", "R$ 0,00"],
                        ["02/02/24", "Entrada", "R$ 0,00", "Cliente 02", "Boleto", "R$ 0,00", "R$ 0,00"],
                        ["02/02/24", "Entrada", "R$ 0,00", "Cliente 02", "Boleto", "R$ 0,00", "R$ 0,00"],
                        ["02/02/24", "Entrada", "R$ 0,00", "Cliente 02", "Boleto", "R$ 0,00", "R$ 0,00"],
                        ["02/02/24", "Entrada", "R$ 0,00", "Cliente 02", "Boleto", "R$ 0,00", "R$ 0,00"],
                        ["02/02/24", "Entrada", "R$ 0,00", "Cliente 02", "Boleto", "R$ 0,00", "R$ 0,00"],
                        ["02/02/24", "Entrada", "R$ 0,00", "Cliente 02", "Boleto", "R$ 0,00", "R$ 0,00"],
                        ["02/02/24", "Entrada", "R$ 0,00", "Cliente 02", "Boleto", "R$ 0,00", "R$ 0,00"],
                        ["02/02/24", "Entrada", "R$ 0,00", "Cliente 02", "Boleto", "R$ 0,00", "R$ 0,00"],
                        ["02/02/24", "Entrada", "R$ 0,00", "Cliente 02", "Boleto", "R$ 0,00", "R$ 0,00"],
                    ]}
                />
            {/* </div> */}
        </div>
    )
}