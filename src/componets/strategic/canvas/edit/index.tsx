import React, { useEffect, useState } from "react";

import ContainerWithBordes from "../../../globals/containerWithBordes"
import CompactedButtonDefault from "../../../globals/buttons/compactedButtonDefault"
import BackButton from "../../../globals/buttons/backButton"

import styles from "./styles.module.css"

import { useForm } from 'react-hook-form';
import { axiosConfig } from "../../../../ultils/axios";
import { useLocation } from "react-router-dom";

interface IProps {
    onClose: () => void;
    onSave:(data: any) => void;
    data: any;
}

export default function EditCanvas({ data, onSave }: IProps) {    
    const location = useLocation();

    const {
        register,
        handleSubmit,
        reset
      } = useForm({
        mode: "onChange",
        defaultValues: {
            label: "",
            keyPartners: "", //
            keyActivities: "", //
            costStructure: "", //
            valueOfeer: "", //
            customerRelations: "", //
            channels: "", //
            sourcesOfIncone: "", //
            customerSegments: "", //
            keyFeatures: "" //
        }
    })

    useEffect(() => {
        reset(data);
    }, [data])

    return (
        <div className={[styles.page].join(" ")}>

            

            <form 
                className={[styles.form].join(" ")}
                onSubmit={handleSubmit(onSave, (e) => console.error(e))}
            >
                <div className={styles.keyActivities}>
                    <h3>ATIVIDADES CHAVE</h3>
                    <hr />
                    <textarea {...register("keyActivities")} id=""></textarea>
                </div>

                <div>
                    <h3>RELAÇOES COM CLIENTES</h3>
                    <hr />
                    <textarea {...register("customerRelations")} id=""></textarea>
                </div>

                <div>
                    <h3>RECURSOS CHAVE</h3>
                    <hr />
                    <textarea {...register("keyFeatures")} id=""></textarea>
                </div>                

                <div>
                    <h3>CANAIS</h3>
                    <hr />
                    <textarea {...register("channels")} id=""></textarea>
                </div>

                <div>
                    <h3>ESTRUTURA DE CUSTOS</h3>
                    <hr />
                    <textarea {...register("costStructure")} id=""></textarea>
                </div>                

                <div className={styles.valueOfeer}>
                    <h3>PROPOSTA DE VALOR</h3>
                    <hr />
                    <textarea {...register("valueOfeer")} id=""></textarea>
                </div>

                <div>
                    <h3>SEGMENTOS DE CLIENTES</h3>
                    <hr />
                    <textarea {...register("customerSegments")} id=""></textarea>
                </div>

                <div className={styles.sourcesOfIncone}>
                    <h3>FONTES DE RENDA</h3>
                    <hr />
                    <textarea {...register("sourcesOfIncone")} id=""></textarea>
                </div>

                <div className={styles.keyPartners}>
                    <h3>PARCEIROS CHAVE</h3>
                    <hr />
                    <textarea {...register("keyPartners")} id=""></textarea>
                </div>

                <div className={styles.button}>
                    <button type="submit">salvar</button>
                </div>
            </form>



        </div> 
    )
}