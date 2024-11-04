import React, { useEffect, useState } from "react";

import Header from "../../../componets/globals/header";
import Search from "../../../componets/globals/inputs/search";
import SubMenu from "../../../componets/globals/menus/subMenu";
import ContainerWithBordes from "../../../componets/globals/containerWithBordes"
import InputGrup from "../../../componets/strategic/indicators/inputs";
import ControlsBar from "../../../componets/globals/controlsBar";


import styles from "./styles.module.css"
import BackButton from "../../../componets/globals/buttons/backButton";
import { useNavigate } from "react-router-dom";
import { axiosConfig } from "../../../ultils/axios";
import { momentTimezoneConfig } from "../../../ultils/date";
import { useForm } from "react-hook-form";
import DateAndMonth from "../../../componets/globals/selects/dateAndMonth";
import { IIndicadores } from "./types";
import { defaultData } from "./data";
import moment from "moment-timezone";
import { arrow } from "./ultils";
import Filter_data from "../../../componets/globals/selects/filter_data";


export default function IndicatorsStrategic() {
    const usenavigate = useNavigate();
    const [date, setDate] = useState<{ month: string, year: string }>({
        year: momentTimezoneConfig.year().toString(),
        month: momentTimezoneConfig.format("MM")
    });

    const [data, setData] = useState<{ now: IIndicadores, previous: IIndicadores }>({
        now: defaultData,
        previous: defaultData
    });

    let [id, setId] = useState<number>();

    const {
        register,
        getValues,
        reset,
        watch
      } = useForm({
        mode: "onChange",
        defaultValues: defaultData
    })

    useEffect(() => {
        load();

    }, [date]); 

    useEffect(() => {
        console.log(data)

    }, [data]); 

    async function load(): Promise<void> {
        try {
            reset(defaultData);

            const res = await axiosConfig(`/indicators/${date.month}-${date.year}?previous=${moment(`${date.month}-${date.year}`, "MM-yyyy").subtract({ month: 1 }).format("MM-yyyy")}`);

            let data: {
                now?: IIndicadores,
                previous?: IIndicadores
            } = res.data.data;

            if(data.now) {
                setId(data.now.id);
                

                delete data.now.id;
            }

            reset(data.now ? data.now : defaultData);

            setData({
                now: data.now ? data.now : defaultData,
                previous: data.previous ? data.previous : defaultData
            });
        }catch(error) {
            console.error(error);
        }
    }

    async function create(): Promise<void> {
        try {
            await axiosConfig(`/indicators/${date.month}-${date.year}?id=${id}`, {
                method: "patch",
                data: {
                    invoicing: parseFloat(getValues("invoicing") as any),
                    customersServed: parseFloat(getValues("customersServed") as any),
                    averageTicket: parseFloat(getValues("averageTicket") as any),
                    averageCost: parseFloat(getValues("averageCost") as any),
                    budgetedVsRealized: parseFloat(getValues("budgetedVsRealized") as any),
                    actionPlan: parseFloat(getValues("actionPlan") as any),
                    productivity: parseFloat(getValues("productivity") as any),
                    customerSatisfaction: parseFloat(getValues("customerSatisfaction") as any),
                    timeline: parseFloat(getValues("timeline") as any),
                    nps: parseFloat(getValues("nps") as any),
                    customerEngagement: parseFloat(getValues("customerEngagement") as any),
                    employeeSatisfaction: parseFloat(getValues("employeeSatisfaction") as any),
                    employeeEngagement: parseFloat(getValues("employeeEngagement") as any)}
            });

            load();
            
        }catch(e) {
            console.error(e);
        }
    }

    return (
        <div className={[styles.container, "scroll-y-auto"].join(" ")}>
            <Header
                title="Bem vindo, Mind Gestão!"
                showPrintOutButton={false}
            />

            <Search/>
            <SubMenu/>

            <BackButton onClick={() => usenavigate("/strategic")}/>

            <ContainerWithBordes
                className={[styles.indicators].join(" ")}
            >
                <div>
                    <h1>Indicadores</h1>
                    <p>Indicadores são métricas usadas para quantificar e avaliar o desempenho de processos, metas ou estratégias dentro de uma organização.</p>
                </div>
            </ContainerWithBordes>

            <ControlsBar
                className={styles.controlsBar}
            >
                <Filter_data
                    className={styles.filter_data}
                    OnChangeDate={e => setDate(e)}
                />


                <button 
                    disabled={JSON.stringify(watch()) == JSON.stringify(data.now)}
                    onClick={create} 
                    className={[styles.saveButton, JSON.stringify(watch()) != JSON.stringify(data.now) && styles.showSaveButton].join(" ")}
                > {JSON.stringify(watch()) != JSON.stringify(data.now) ? "Salvar" : "Salvo"} </button>
                
            </ControlsBar>

            <div className={[styles.row].join(" ")}>
                <div className={[styles.card].join(" ")}>
                    <div className={[styles.results].join(" ")}>
                        <form 
                            className={[styles.column].join(" ")}
                        >   
                            <h2> Mês atual - {data.now.date} </h2>

                            <InputGrup type={"number"} register={register("invoicing", { valueAsNumber: true })} label="Faturamento:"/>
                            <InputGrup type={"number"} register={register("customersServed", { valueAsNumber: true })} label="Clientes atendidos:"/>
                            <InputGrup type={"number"} register={register("averageTicket", { valueAsNumber: true })} label="Ticket médio:"/>
                            <InputGrup type={"number"} register={register("averageCost", { valueAsNumber: true })} label="Custo Médio:"/>
                            <InputGrup type={"number"} register={register("budgetedVsRealized", { valueAsNumber: true })} label=" Orçado vs Realizado:"/>
                            <InputGrup type={"number"} register={register("actionPlan", { valueAsNumber: true })} label=" Plano de ação:"/>
                            <InputGrup type={"number"} register={register("productivity", { valueAsNumber: true })} label="Produtividade:"/>
                            <InputGrup type={"number"} register={register("customerSatisfaction", { valueAsNumber: true })} label="Satisfação do cliente:"/>
                            <InputGrup type={"number"} register={register("timeline", { valueAsNumber: true })} label="Cronograma:"/>
                            <InputGrup type={"number"} register={register("nps", { valueAsNumber: true })} label="NPS:"/>
                            <InputGrup type={"number"} register={register("customerEngagement", { valueAsNumber: true })} label="Engajamento do cliente:"/>
                            <InputGrup type={"number"} register={register("employeeSatisfaction", { valueAsNumber: true })} label="Satisfação do colaborador:"/>
                            <InputGrup type={"number"} register={register("employeeEngagement", { valueAsNumber: true })} label="Engajamento do Colaborador:"/>
                        </form>

                        <div className={[styles.column].join(" ")}>
                            <h2> Mês anterior - {moment(`${date.month}-${date.year}`, "MM-yyyy").subtract({ month: 1 }).format("MM-yyyy")} </h2>

                            <InputGrup defaultValue={data.previous.invoicing} type={"number"} className={[styles.inputType1].join(" ")}  disabled={true} label="Faturamento:"/>
                            <InputGrup defaultValue={data.previous.customersServed} type={"number"} className={[styles.inputType1].join(" ")}  disabled={true} label="Clientes atendidos:"/>
                            <InputGrup defaultValue={data.previous.averageTicket} type={"number"} className={[styles.inputType1].join(" ")}  disabled={true} label="Ticket médio:"/>
                            <InputGrup defaultValue={data.previous.averageCost} type={"number"} className={[styles.inputType1].join(" ")}  disabled={true} label="Custo Médio:"/>
                            <InputGrup defaultValue={data.previous.budgetedVsRealized} type={"number"} className={[styles.inputType1].join(" ")}  disabled={true} label=" Orçado vs Realizado:"/>
                            <InputGrup defaultValue={data.previous.actionPlan} type={"number"} className={[styles.inputType1].join(" ")}  disabled={true} label=" Plano de ação:"/>
                            <InputGrup defaultValue={data.previous.productivity} type={"number"} className={[styles.inputType1].join(" ")}  disabled={true} label="Produtividade:"/>
                            <InputGrup defaultValue={data.previous.customerSatisfaction} type={"number"} className={[styles.inputType1].join(" ")}  disabled={true} label="Satisfação do cliente:"/>
                            <InputGrup defaultValue={data.previous.timeline} type={"number"} className={[styles.inputType1].join(" ")}  disabled={true} label="Cronograma:"/>
                            <InputGrup defaultValue={data.previous.nps} type={"number"} className={[styles.inputType1].join(" ")}  disabled={true} label="NPS:"/>
                            <InputGrup defaultValue={data.previous.customerEngagement} type={"number"} className={[styles.inputType1].join(" ")}  disabled={true} label="Engajamento do cliente:"/>
                            <InputGrup defaultValue={data.previous.employeeSatisfaction} type={"number"} className={[styles.inputType1].join(" ")}  disabled={true} label="Satisfação do colaborador:"/>
                            <InputGrup defaultValue={data.previous.employeeEngagement} type={"number"} className={[styles.inputType1].join(" ")}  disabled={true} label="Engajamento do Colaborador:"/>
                        </div>

                        {/* <div className={[styles.column].join(" ")}>
                            <InputGrup defaultValue={data.now.invoicing} type={"number"} className={[styles.inputType1].join(" ")}  disabled={true} label="Faturamento:"/>
                            <InputGrup defaultValue={data.now.customersServed} type={"number"} className={[styles.inputType1].join(" ")}  disabled={true} label="Clientes atendidos:"/>
                            <InputGrup defaultValue={data.now.averageTicket} type={"number"} className={[styles.inputType1].join(" ")}  disabled={true} label="Ticket médio:"/>
                            <InputGrup defaultValue={data.now.averageCost} type={"number"} className={[styles.inputType1].join(" ")}  disabled={true} label="Custo Médio:"/>
                            <InputGrup defaultValue={data.now.budgetedVsRealized} type={"number"} className={[styles.inputType1].join(" ")}  disabled={true} label=" Orçado vs Realizado:"/>
                            <InputGrup defaultValue={data.now.actionPlan} type={"number"} className={[styles.inputType1].join(" ")}  disabled={true} label=" Plano de ação:"/>
                            <InputGrup defaultValue={data.now.productivity} type={"number"} className={[styles.inputType1].join(" ")}  disabled={true} label="Produtividade:"/>
                            <InputGrup defaultValue={data.now.customerSatisfaction} type={"number"} className={[styles.inputType1].join(" ")}  disabled={true} label="Satisfação do cliente:"/>
                            <InputGrup defaultValue={data.now.timeline} type={"number"} className={[styles.inputType1].join(" ")}  disabled={true} label="Cronograma:"/>
                            <InputGrup defaultValue={data.now.nps} type={"number"} className={[styles.inputType1].join(" ")}  disabled={true} label="NPS:"/>
                            <InputGrup defaultValue={data.now.customerEngagement} type={"number"} className={[styles.inputType1].join(" ")}  disabled={true} label="Engajamento do cliente:"/>
                            <InputGrup defaultValue={data.now.employeeSatisfaction} type={"number"} className={[styles.inputType1].join(" ")}  disabled={true} label="Satisfação do colaborador:"/>
                            <InputGrup defaultValue={data.now.employeeEngagement} type={"number"} className={[styles.inputType1].join(" ")}  disabled={true} label="Engajamento do Colaborador:"/>
                        </div> */}

                        <div className={[styles.column].join(" ")}>
                            <p> {arrow(data.previous.invoicing, watch("invoicing"))} </p>
                            <p> {arrow(data.previous.customersServed, watch("customersServed"))} </p>
                            <p> {arrow(data.previous.averageTicket, watch("averageTicket"))} </p>
                            <p> {arrow(data.previous.averageCost, watch("averageCost"))} </p>
                            <p> {arrow(data.previous.budgetedVsRealized, watch("budgetedVsRealized"))} </p>
                            <p> {arrow(data.previous.actionPlan, watch("actionPlan"))} </p>
                            <p> {arrow(data.previous.productivity, watch("productivity"))} </p>
                            <p> {arrow(data.previous.customerSatisfaction, watch("customerSatisfaction"))} </p>
                            <p> {arrow(data.previous.timeline, watch("timeline"))} </p>
                            <p> {arrow(data.previous.nps, watch("nps"))} </p>
                            <p> {arrow(data.previous.customerEngagement, watch("customerEngagement"))} </p>
                            <p> {arrow(data.previous.employeeSatisfaction, watch("employeeSatisfaction"))} </p>
                            <p> {arrow(data.previous.employeeEngagement, watch("employeeEngagement"))} </p>
                        </div>
                        
                    </div>

                </div>
            </div>
            
            
        </div>
    )
}
