
import { useNavigate } from "react-router-dom";
import ContainerWithBordes from "../../componets/globals/containerWithBordes";
import Header from "../../componets/globals/header";
import Search from "../../componets/globals/inputs/search";
import SubMenu from "../../componets/globals/menus/subMenu";
import CardChart from "../../componets/strategic/chart/card";
import { IDataPeoples, dataPeoples } from "./data";
import styles from "./styles.module.css";

export default function Peoples() {
    const usenavigate = useNavigate();

    return (
        <div className={[styles.container, "w-full"].join(" ")}>
            <Header
                title="Bem vindo, Mind Gestão!"
                showPrintOutButton={false}
            />

            <Search/>
            <SubMenu/>

            <ContainerWithBordes className={[styles.containerWithBordes, "bg-white"].join(" ")}>
                <h1> Pessoas </h1>
                <p>Área de trabalho - Suas ferramentas de RH estão aqui:</p>
            </ContainerWithBordes>


            <div className={[styles.grid, "grid grid-cl4 grid-gab-16"].join(" ")}>
                {dataPeoples.map(({ title, href, date }: IDataPeoples, key) => {
                    return (
                        <CardChart
                            key={key}
                            date={date}
                            title={title}
                            onClick={() => usenavigate(`/strategic/canvas/open/${href}`)}
                        />
                    )
                })}
            </div>
        </div>
    )
}