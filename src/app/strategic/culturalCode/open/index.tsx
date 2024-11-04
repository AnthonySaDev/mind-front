


import Header from "../../../../componets/globals/header";
import SubMenu from "../../../../componets/globals/menus/subMenu";
import Card_AboutCompany_CulturalCode from "../../../../componets/strategic/culturalCode/aboutCompany/card";
import BackButton from "../../../../componets/globals/buttons/backButton";

import { useLocation, useNavigate } from "react-router-dom";

import styles from "./styles.module.css";

import {Editor} from 'primereact/editor';
import { useEffect, useState } from "react";
import "./styles.css";
import { axiosConfig, baseURL } from "../../../../ultils/axios";
import { cutText } from "../../../../ultils/text";
import { previewFile } from "../../../../ultils/file";
import { Link } from "react-router-dom";

export default function CulturalCode_Code() {
    const usenavigate = useNavigate();
    const location = useLocation();
    const [files, setFile] = useState<FileList>();

    const [data, setData] = useState<{
        description: string
        label: string
        files: any
    }>({ description: "", label: "", files: [] });

    useEffect(() => {
        load();
    }, []);

    useEffect(() => {
        console.log(data)
    }, [data]);

    async function load() {
        try {       
            const { data } = await axiosConfig(`/culturalCode/${location.pathname.split("/")[4]}`);
            
            setData({
                description: data.data.data.description,
                label: data.data.data.label,
                files: data.data.data.files
            });
        }catch(e) {
            console.error(e);
        }
    }

    async function save() {
        try {
            const filesUpload = await axiosConfig(`/culturalCode/upload`, {
                method: "POST",
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                data: {
                    file: files
                }
            });

            console.log({
                description: data.description,
                label: data.label,
                files: filesUpload.data.files
            })

            await axiosConfig(`/culturalCode/${location.pathname.split("/")[4]}`, {
                method: "PATCH",
                data: {
                    description: data.description,
                    label: data.label,
                    files: filesUpload.data.files
                }
            });
            
            // setData({
            //     description: data.data.data.description,
            //     label: data.data.data.label
            // });
        }catch(e) {
            console.error(e);
        }
    }

    return (
        <div className={[styles.container, "scroll-y-auto w-full"].join(" ")}>
            <Header
                title="Configurações Mind Gestão"
                showPrintOutButton={false}
            />
            
            <SubMenu
                data={[
                    { to: "/", label: "Sobre a empresa" },
                    { to: "account", label: "Conta" }
                ]}
            />

            <BackButton onClick={() => usenavigate("/strategic/culturalCode")}/>
            
            <div className={["w-full", styles.content].join(" ")}>
                <input 
                    placeholder="" 
                    className={styles.label} 
                    type="text"
                    value={data.label}
                    onChange={(e) => {
                        setData({
                            ...data,
                            label: e.currentTarget.value
                        })
                    }} 
                />
                

                <h4> <img src="/icons/pencil.svg" alt="" /> Sobre nós</h4>
                <div className={[styles.containerList].join(" ")}>

                    
                    <div
                        className={styles.filesList}
                    >
                        {files && Array.from(files).map((file, key) => {

                            return (
                                <div className={styles.file} key={key}>
                                    <img width={"20px"} height={"20px"} src={previewFile(file, true)} alt="" />
                                    <div className={styles.infos}>
                                        <span title={file.name}> {cutText(file.name, 20)}</span>
                                        <span>Tipo: {file.type}</span>
                                        <span>Novo</span>
                                    </div>
                                </div>
                            )
                        })}

                        {data.files.map((file: any, key: any) => {

                            return (
                                <div className={styles.file} key={key}>
                                    <img 
                                        width={"20px"} 
                                        height={"20px"} 
                                        src={previewFile(file)}
                                        alt=""
                                    />

                                    <div className={styles.infos}>
                                        <span title={file.filename}> {cutText(file.filename, 20)} </span>
                                        <span>Tipo: {file.type}</span>

                                        <Link target="_blank" to={baseURL + file.path} download={true}>baixar</Link>
                                    </div>
                                </div>
                            )   
                        })}

                    <div className={styles.upload}>
                        <label htmlFor="for">+</label>
                        <input multiple onChange={({ currentTarget }) => {
                            currentTarget.files && setFile(currentTarget.files)
                        }} id="for" type="file" />
                    </div>
                    </div>
                </div>

                

                <h4> <img src="/icons/pencil.svg" alt="" /> Descrição</h4>
                <Editor 
                    className={"editor"}  
                    value={data?.description} 
                    onTextChange={(e) => {
                        setData({
                            ...data,
                            description: e.htmlValue!
                        })
                    }} 
                    style={{ height: '400px' }}
                />

                <button 
                    className={styles.saveButton}
                    onClick={save}    
                >salvar</button>

            </div>
                    
        </div>
    )
}