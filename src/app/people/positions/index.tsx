import CreateButton from "../../../componets/globals/buttons/createButton";
import ContainerWithBordes from "../../../componets/globals/containerWithBordes";
import GridCard from "../../../componets/globals/gridCard";
import Header from "../../../componets/globals/header";
import Search from "../../../componets/globals/inputs/search";
import SubMenu from "../../../componets/globals/menus/subMenu";
import styles from "./styles.module.css";

export default function Positions() {
    return (
        <div className={[styles.container].join(" ")}>
            <Header
                title="Bem vindo, Mind Gestão!"
                showPrintOutButton={false}
            />

            <Search/>
            <SubMenu/>

            <ContainerWithBordes className={[styles.containerWithBordes].join(" ")}>
                <div>
                    <h1>Pessoas</h1>
                    <p>Área de trabalho - Suas ferramentas de RH estão aqui:</p>
                </div>

                <CreateButton/>
            </ContainerWithBordes>

            <GridCard
                data={[
                    { title: "Cargos", date: "2/01/2024" },
                    { title: "Ranking", date: "2/01/2024" },
                ]}
                onSelect={() => {}}
            />

        </div>
    )
}