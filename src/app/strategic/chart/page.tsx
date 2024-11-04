
import { useNavigate } from "react-router-dom";
import BackButton from "../../../componets/globals/buttons/backButton";
import ContainerWithBordes from "../../../componets/globals/containerWithBordes";
import Header from "../../../componets/globals/header";
import Search from "../../../componets/globals/inputs/search";
import SubMenu from "../../../componets/globals/menus/subMenu";
import styles from "./styles.module.css";
import AddNewTaskButton from "../../../componets/globals/buttons/addNewTask";
import CardChart from "../../../componets/strategic/chart/card";


import { dataChart, IDataChart } from "./data";

export default function Chart() {
    const usenavigate = useNavigate();

    return (
        <div className={[styles.container, "w-full scroll-y-auto padding-b-64"].join(" ")}>
            <Header
                title="Bem vindo, Mind Gestão!"
                showPrintOutButton={false}
            />

            <Search/>
            <SubMenu/>

            <BackButton onClick={() => usenavigate("/strategic")}/>

            <ContainerWithBordes className={["bg-white flex space-between align-items margin-b-32"].join(" ")}>
                <div>
                    <h1> Organograma </h1>
                    <p> Seus mapas mentais estão organizados aqui: </p>
                </div>
                
                <AddNewTaskButton title="Criar novo"/>
            </ContainerWithBordes>

            <div className={[styles.grid, "grid grid-cl3 grid-gab-16"].join(" ")}>
                {dataChart.map(({ title, href, date}: IDataChart, key) => {
                    return (
                        <CardChart 
                            date={date}
                            title={title}
                            onClick={() => usenavigate(`/strategic/chart/open/${href}`)}
                        />
                    )
                })}
            </div>

        </div>
    )
}