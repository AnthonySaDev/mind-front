import { useNavigate } from "react-router-dom";
import BackButton from "../../../componets/globals/buttons/backButton";
import Header from "../../../componets/globals/header";
import Search from "../../../componets/globals/inputs/search";
import SubMenu from "../../../componets/globals/menus/subMenu";
import styles from "./styles.module.css";
import ContainerWithBordes from "../../../componets/globals/containerWithBordes";
import AddNewTaskButton from "../../../componets/globals/buttons/addNewTask";
import { useEffect, useState } from "react";
import { axiosConfig } from "../../../ultils/axios";

interface Item {
    label?: string 
    link?: string
    id?: number
}

function Useful_Page() {
    const navigate = useNavigate();

    const [form, setForm] = useState<Item>({ label: "", link: "" });
    const [data, setData] = useState<Item[]>([]);
    
    async function load() {
        try {
            const response = await axiosConfig("/useful");
            
            const new_data = response.data.data.map(({ id, label, link }: Item) => {
                return { id, label, link }
            });
            
            setData(new_data);
        }catch(error) {
            console.error(error);
        }
    }
    
    async function update() {
        try {
            const reponse = await axiosConfig(`/useful/${form.id}`, {
                method: "patch",
                data: {
                    label: form.label,
                    link: form.link
                }
            });

            console.log(reponse)
        }catch(error) {
            console.error(error);
        }
    }

    async function delete_(body: Item) {
        try {        
            await axiosConfig(`/useful/${body.id}`, {
                method: "delete"
            });

            load();
          }catch(error) {
            console.error(error);
          } 
    }

    async function save() {
      try {        
        const new_data = [form, ...data];
        setData(new_data);

        const reponse = await axiosConfig("/useful", {
            method: "post",
            data: {
                label: form.label,
                link: form.link
            }
        });

        new_data[0] = {
            label: form.label,
            link: form.link,
            id: reponse.data.data.id
        }

        setData([...new_data]);
        setForm({ label: "", link: "", id: undefined });
      }catch(error) {
        console.error(error);
      } 
    } 

    useEffect(() => {
        load();
    }, []);

    return (
        <div
            className={styles.container}
        >
            <Header
                title="Bem vindo, Mind Gestão!"
                showPrintOutButton={false}
            />

            <Search/>
            <SubMenu/>

            <BackButton onClick={() => navigate("/strategic")}/>

            <ContainerWithBordes className={["bg-white margin-b-32"].join(" ")}>
                <div>
                    <h1> Links </h1>
                </div>

                <div className={["flex space-between", styles.create].join(" ")}>
                    <input defaultValue={form?.label} value={form?.label} onChange={(e) => setForm({ label: e.currentTarget.value, link: form.link, id: form.id })} type="text" placeholder="Título" /> 
                    <input defaultValue={form?.link} value={form?.link} onChange={(e) => setForm({ label: form.label, link: e.currentTarget.value, id: form.id })} type="text" placeholder="Link" /> 
                    <AddNewTaskButton 
                        onClick={() => {
                            form.id ? update() : save()
                        }} 
                        title={form.id ? "Atualizar" : "Criar"}
                    />
                </div>
            </ContainerWithBordes>

            <div className={styles.list}>
                {data.map(({ label, link, id }, key) => {
                    return (
                        <div key={key} className={styles.card}>
                            <h3> {label} </h3>
                            <div className={styles.controlls}>
                                <button onClick={() => {
                                    delete_({
                                        id,
                                        label,
                                        link
                                    })
                                }}>delete</button>
                                
                                
                                <button onClick={() => {
                                    setForm({
                                        id,
                                        label,
                                        link
                                    })
                                }}>editar</button>
                                
                                <a target={"_blank"} title={`link: ${link}`} href={link}>open</a>
                            </div>
                        </div>
                    )
                })}
            </div>
                
        </div>
    )
}

export default Useful_Page;
