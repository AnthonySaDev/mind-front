import { useLocation, useNavigate } from "react-router-dom";
import BackButton from "../../../../componets/globals/buttons/backButton";
import BuildingDev from "../../../../componets/globals/dev/building";
import Header from "../../../../componets/globals/header";
import Search from "../../../../componets/globals/inputs/search";
import SubMenu from "../../../../componets/globals/menus/subMenu";
import EditCanvas from "../../../../componets/strategic/canvas/edit";
import styles from "./styles.module.css";
import ContainerWithBordes from "../../../../componets/globals/containerWithBordes";
import PrintButton from "../../../../componets/globals/buttons/printOutButton";
import FilterButton from "../../../../componets/globals/buttons/filterButton";
import { axiosConfig } from "../../../../ultils/axios";
import { useEffect, useState } from "react";

export default function CanvasOpen() {
    const usenavigate = useNavigate();
    const location = useLocation();
    const [data, setData] = useState<any>();

    let [frameDescription, setFrameDescription] = useState("");
    let [responsible, setResponsible] = useState("");

    async function load() {
        try {
            const response = await axiosConfig(`/canvas/${location.pathname.split("/")[4]}`);

            const newData = response.data.data;
            delete newData.updatedAt;
            delete newData.createdAt;
            delete newData.id;
            delete newData.userId;

            setFrameDescription(newData.frameDescription);
            setResponsible(newData.responsible);

            setData(newData);
        }catch(e) {
            alert("alert in alter");
            console.error(e);
        }
    } 

    async function save(data: any) {
        try {   
            console.log({
                frameDescription,
                responsible
            })

            await axiosConfig(`/canvas/${location.pathname.split("/")[4]}`, {
                method: "PATCH",
                data: {
                    ...data,
                    frameDescription,
                    responsible
                }
            });
        }catch(e) {
            // alert("alert in alter");
            console.error(e);
        }
    }

    useEffect(() => {
        load();
    }, []);

    return (
        <div className={[
            styles.canvasOpen,
            "w-full scroll-y-auto"
        ].join(" ")}>
            <Header
                title="Bem vindo, Mind Gestão!"
                showPrintOutButton={false}
            />

            <Search/>
            <SubMenu/>

            <BackButton
                onClick={() => usenavigate("/strategic/canvas")}
            />

            <ContainerWithBordes className={["bg-white flex space-between align-items"].join(" ")}>
                <div className={[styles.canvasDescription].join(" ")}>
                    <h1>{data ? data.label : "------"}</h1>
                    
                    <div className={["flex align-items "].join(" ")}>
                        <img src="/icons/pencil.svg" alt="" /> 
                        <p>Descrição do Quadro: </p>   
                        <input onChange={e => setFrameDescription(e.currentTarget.value)} defaultValue={data?.frameDescription} type="text"/> 
                    </div>

                    <div className={["flex align-items "].join(" ")}>
                        <img src="/icons/pencil.svg" alt="" /> 
                        <p>Responsável: </p>
                        <input onChange={e => setResponsible(e.currentTarget.value)} defaultValue={data?.responsible} type="text"/>
                    </div>
                </div>

                {/* <div  className={[
                    styles.column,
                    "flex"
                ].join(" ")}>
                    <FilterButton/>
                    <PrintButton className="margin-l-16"/>
                </div> */}

            </ContainerWithBordes>

            <EditCanvas onSave={save} data={data} onClose={() => {}} />
        </div>
    )
}