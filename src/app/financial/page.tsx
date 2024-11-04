import { useNavigate } from "react-router-dom";
import ContainerWithBordes from "../../componets/globals/containerWithBordes";
import GridCard from "../../componets/globals/gridCard";
import Header from "../../componets/globals/header";
import Search from "../../componets/globals/inputs/search";
import SubMenu from "../../componets/globals/menus/subMenu";

import styles from "./styles.module.css";

export default function Financial() {
    const navigate = useNavigate();

    return (
        <div className={[styles.container].join(" ")}>
            <Header
                title="Bem vindo, Mind Gestão!"
                showPrintOutButton={false}
            />

            <Search/>
            <SubMenu/>

            <ContainerWithBordes className={[styles.containerWithBordes].join(" ")}>
                <h1> Financeiro </h1>
                <p>Área de trabalho - Suas ferramentas de RH estão aqui:</p>
            </ContainerWithBordes>

            <div className={[styles.cardGrid].join(" ")}>
                <div 
                    className={[styles.card].join(" ")}
                    onClick={() => navigate("/financial/cashFlow")}
                >
                    <h3> <img src="/icons/money.svg" alt="money" /> Fluxo de caixa </h3>
                    <p>Controle suas finanças: Uma visão clara e detalhada das entradas e saídas de dinheiro em seu negócio.</p>
                </div>

                <div 
                    className={[styles.card].join(" ")}
                    onClick={() => navigate("/financial/dre")}
                >
                    <h3> <img src="/icons/graphics.svg" alt="graphics" /> DRE </h3>
                    <p> Demonstração do Resultado do Exercício: análise detalhada dos lucros e despesas que impulsiona decisões estratégicas. </p>
                </div>
            </div>
        </div>
    )
}