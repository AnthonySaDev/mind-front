

import { useNavigate } from "react-router-dom";
import BackButton from "../../../../componets/globals/buttons/backButton";
import Header from "../../../../componets/globals/header";
import Search from "../../../../componets/globals/inputs/search";
import SubMenu from "../../../../componets/globals/menus/subMenu";
import styles from "./styles.module.css";
import ContainerWithBordes from "../../../../componets/globals/containerWithBordes";
import AddNewTaskButton from "../../../../componets/globals/buttons/addNewTask";
import BuildingDev from "../../../../componets/globals/dev/building";
import KanbanTest from "../../../../componets/strategic/kanban";

function KanbanBoard() {
    const usenavigate = useNavigate();

    return (
        <div className={[styles.container].join()}>
            <Header
                title="Bem vindo, Mind Gestão!"
                showPrintOutButton={false}
            />

            <Search/>
            <SubMenu/>

            <BackButton onClick={() => usenavigate("/strategic/timeline")}/>

            <KanbanTest/>
        </div>
    )
}

export default KanbanBoard;
