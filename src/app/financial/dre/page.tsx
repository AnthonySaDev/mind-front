
import { useNavigate } from "react-router-dom";
import BackButton from "../../../componets/globals/buttons/backButton";
import Header from "../../../componets/globals/header";
import Search from "../../../componets/globals/inputs/search";
import SubMenu from "../../../componets/globals/menus/subMenu";
import styles from "./styles.module.css";
import ContainerWithBordes from "../../../componets/globals/containerWithBordes";
import PrintButton from "../../../componets/globals/buttons/printOutButton";
import ButtonFilter from "../../../componets/globals/buttons/filterButton";
import DashboardFinance from "../../../componets/dashboard/finance";
import DreEditFinancial from "../../../componets/financial/dre/edit";
import DreResultFinancial from "../../../componets/financial/dre/result";
import { useEffect } from "react";
import { axiosConfig } from "../../../ultils/axios";

export default function Dre() {
    const navigate = useNavigate();

    // async function loadData(): Promise<void> {
    //     try {
    //         const response = await axiosConfig("/dre");
    //         console.log(response.data);
    //     }catch(error) {
    //         console.log(error);
    //     }
    // }

    // useEffect(() => {
    //     loadData();
    // }, []);

    return (
        <div className={[styles.container].join(" ")}>
            <Header
                title="Bem vindo, Mind Gestão!"
                showPrintOutButton={false}
            />

            <Search/>
            <SubMenu/>

            <BackButton onClick={() => navigate("/financial")}/>

            <ContainerWithBordes 
                className={[
                    styles.containerWithBordes,
                    "bg-white flex space-between align-items"
                ].join(" ")}
            >
                <div>
                    <h1>DRE</h1>
                    <p> <img src="/icons/pencil.svg" alt="" /> Descrição: Aqui tem uma breve descrição editável sobre o DRE. </p>
                    <p> <img src="/icons/pencil.svg" alt="" /> Responsável: Marcos Silva -  P.O </p>
                </div>

                <div className="flex">
                    <ButtonFilter/>
                    <PrintButton className={[styles.printButton, "margin-l-16"].join(" ")}/>
                </div>
            </ContainerWithBordes >

            <div className={[styles.content, ""].join(" ")}>
                <DreEditFinancial />
            </div>

        </div>
    )
}