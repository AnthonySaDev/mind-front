import { useEffect, useState } from "react";
import DividerDefault from "../../../globals/divider/default";
import InputAndLabel from "../../../globals/inputs/inputAndLabel";
import InputAndLabelArrow from "../../../globals/inputs/inputAndLabelArrow";
import styles from "./styles.module.css";
import { IResult } from "../edit";


interface IDre {
    grossRevenue: any,
    tax: any,
    cost: any,
    expenses: any,
    reinvestments: any,
    personalExpenses: any,
}

interface IProps {
    className?: string;
    budget: IDre;
    accomplished: IDre;
    result: IResult;
}

export default function DreResultFinancial({ className, accomplished, budget, result }: IProps) {
    // const [result, setResult] = useState<any>();

    const columns = [
        { title: "Orçamento", key: "budget" },
        { title: "Realizado", key: "accomplished" },
    ]

    const itens = [
        { label: "Receita bruta", key: "gross_revenue", is_input: true },
        { label: "Imposto", key: "tax", is_input: true },
        { label: "Receita liquida", key: "ner_revenue", is_input: false }, 
        { label: "Custo", key: "cost", is_input: true },
        { label: "Lucro Bruto", key: "gross_profit", is_input: false },
        { label: "Despesas", key: "expenses", is_input: true },
        { label: "Pró-labore", key: "prolaborate", is_input: true },
        { label: "Investimento", key: "investment", is_input: true },
        { label: "Lucro/Prejuizo", key: "operating_profit_loss", is_input: false }
    ];

    function calc(): void {
        const receita_liquida = budget.grossRevenue - budget.tax;
        const lucro_bruto = budget.cost - receita_liquida;
        const prolabore = lucro_bruto - budget.personalExpenses;
        // const prolabore = lucro_bruto - budget.personalExpenses;


        // setResult({
        //     label: "Receita bruta", value: ,
        // })
    }

    useEffect(() => {
        calc();
    }, [accomplished, budget]);

    const result_itens = [
        { label: "Receita bruta", key: "grossRevenue" },
        { label: "Imposto", key: "tax" },
        { label: "**Receita liquida", key: "grossRevenue" }, 
        { label: "Custo", key: "cost" },
        { label: "**Lucro Bruto", key: "cost" },
        { label: "Dispesas", key: "expenses" },
        { label: "Pró-labore", key: "personalExpenses" },
        { label: "Investimento", key: "reinvestments" },
        { label: "**Operacional", key: "investment" },
    ]

    return (
        <div className={[
            styles.container, className,
        ].join(" ")}>
            <div className={[
                styles.result
            ].join(" ")}>
                
                <div className={[styles.row, styles.result_row].join(" ")}>
                    {columns.map((column, i) => {
                        return (
                            <div key={i} className={styles.column}>
                                <h3 className={["flex align-items", styles.title].join(" ")}> 
                                    <img className="margin-r-8" src="/icons/finance/check.svg" alt="" /> 
                                    {column.title}
                                </h3>

                                <hr className={styles.divider}/>

                                {itens.map((data, key) => {
                                    return (
                                        <Show_result 
                                            className={[styles.item, data.is_input && styles.is_input].join(" ")} 
                                            // @ts-ignore
                                            value={result[data.key][column.key]} 
                                            label={data.label }
                                            // @ts-ignore
                                            result={column.key !== "budget" && result[data.key].arrow}
                                            key={key}
                                        />
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            </div>

        </div>
    )
}

interface IShow_result {
    label: string;
    value: any;
    result?: "up" | "down" | "same";
    className?: string;
}

function Show_result({label, value, result, className}: IShow_result) {
    return (
        <div className={className}>
            <span>{label}</span> 
            <span>{value}</span>

            {result === "up" && <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#007542" d="M12 13q-.425 0-.712-.288T11 12V5.825L7.1 9.7q-.275.275-.687.288T5.7 9.7q-.275-.275-.275-.7t.275-.7l5.6-5.6q.15-.15.325-.212T12 2.425t.375.063t.325.212l5.6 5.6q.275.275.275.688T18.3 9.7q-.3.3-.712.3t-.713-.3L13 5.825V12q0 .425-.288.713T12 13m0 5q-.425 0-.712-.288T11 17v-1q0-.425.288-.712T12 15t.713.288T13 16v1q0 .425-.288.713T12 18m0 4q-.425 0-.712-.288T11 21t.288-.712T12 20t.713.288T13 21t-.288.713T12 22"></path></svg>}        
            {result === "down" && <svg style={{ transform: "rotateZ(180deg)" }} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#a80008" d="M12 13q-.425 0-.712-.288T11 12V5.825L7.1 9.7q-.275.275-.687.288T5.7 9.7q-.275-.275-.275-.7t.275-.7l5.6-5.6q.15-.15.325-.212T12 2.425t.375.063t.325.212l5.6 5.6q.275.275.275.688T18.3 9.7q-.3.3-.712.3t-.713-.3L13 5.825V12q0 .425-.288.713T12 13m0 5q-.425 0-.712-.288T11 17v-1q0-.425.288-.712T12 15t.713.288T13 16v1q0 .425-.288.713T12 18m0 4q-.425 0-.712-.288T11 21t.288-.712T12 20t.713.288T13 21t-.288.713T12 22"></path></svg>}
            {result === "same" && <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 36 36"><path fill="#4f4dff" d="M27 27H9a1 1 0 0 1 0-2h18a1 1 0 0 1 0 2" className="clr-i-outline clr-i-outline-path-1"></path><path fill="none" d="M0 0h36v36H0z"></path></svg>}
        </div> 
    )
}

