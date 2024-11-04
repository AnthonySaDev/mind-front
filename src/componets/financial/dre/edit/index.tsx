
import styles from "./styles.module.css";
import DividerDefault from "../../../globals/divider/default";
import InputAndLabel from "../../../globals/inputs/inputAndLabel";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { axiosConfig } from "../../../../ultils/axios";
import { data_default, IInputs, inputs, result_default } from "./data";
import DreResultFinancial from "../result";
import moment from "moment-timezone";
import Filter_data from "../../../globals/selects/filter_data";

interface IProps {
    className?: string;
}

interface IItem_result {
    budget: number,
    accomplished: number,
    arrow:  "up" | "down" | "same"
}

export interface IResult {
    gross_revenue: IItem_result;
    tax: IItem_result;
    ner_revenue: IItem_result;
    cost: IItem_result;
    gross_profit: IItem_result;
    expenses: IItem_result;
    prolaborate: IItem_result;
    investment: IItem_result;
    operating_profit_loss: IItem_result;
}

export default function DreEditFinancial({ className }: IProps) {
    const [form, setForm] = useState<"budget" | "accomplished" >("budget");
    const [date, setDate] = useState<{ month: string, year: string }>({ month: moment().format("MM"), year: moment().format("YYYY")  });
    const [saveLoad, setSaveLoad] = useState<boolean>(false);
    const [result, setResult] = useState<{
        gross_revenue: IItem_result,
        tax: IItem_result,
        ner_revenue: IItem_result,
        cost: IItem_result,
        gross_profit: IItem_result,
        expenses: IItem_result,
        prolaborate: IItem_result,
        investment: IItem_result,
        operating_profit_loss: IItem_result
    } | null>(null);

    const [data, setData] = useState<{ budget: any, accomplished: any, result?: IResult }>({
        accomplished: data_default,
        budget: data_default
    });

    const {
        register,
        handleSubmit,
        reset
      } = useForm({
        mode: "onChange",
        defaultValues: data_default
    });

    function compare(x: number, y: number): "up" | "down" | "same" {
        if(x < y) return "up";
        if(x > y) return "down";
        return "same";
    }

    function calc(budget: any, accomplished: any) {
        try {  

            // receita bruta - tem input
            const gross_revenue = {
                budget: budget.grossRevenue,
                accomplished: accomplished.grossRevenue,
                arrow: compare(budget.grossRevenue, accomplished.grossRevenue), // quanto maior melhor
            }

            // imposto - tem input
            const tax = {
                budget: budget.tax,
                accomplished: accomplished.tax,
                arrow: compare(accomplished.tax, budget.tax), // quanto menor melhor
            }

            // receita liquida - não tem input
            const ner_revenue = {
                budget: gross_revenue.budget - tax.budget,
                accomplished: gross_revenue.accomplished - tax.accomplished,
                arrow: compare(gross_revenue.budget - tax.budget, gross_revenue.accomplished - tax.accomplished), // perguntar pedim 
            }

            // custo - tem input
            const cost = {
                budget: budget.cost,
                accomplished: accomplished.cost, 
                arrow: compare(accomplished.cost, budget.cost), // quanto menor melhor 
            }

            // lucro bruto - não tem input
            const gross_profit = {
                budget: ner_revenue.budget - cost.budget,
                accomplished: ner_revenue.accomplished - cost.accomplished,
                arrow: compare(ner_revenue.budget - budget.expenses, ner_revenue.accomplished - accomplished.expenses), // quanto maior melhor
            }

            // despesas - tem input
            const expenses = {
                budget: budget.expenses,
                accomplished: accomplished.expenses,
                arrow: compare(accomplished.expenses, budget.expenses), // quanto menor melhor
            }

            // prolabore - tem input - tipo retirada de lucro
            const prolaborate = {
                budget: budget.personalExpenses,
                accomplished: accomplished.personalExpenses,
                arrow: compare(budget.personalExpenses, accomplished.personalExpenses), // quanto menor melhor
            }

             // ivestimento - tem input
             const investment = {
                budget: budget.reinvestments,
                accomplished: accomplished.reinvestments,
                arrow: compare(accomplished.reinvestments, budget.reinvestments), // quanto menor melhor
            }

            // lucro/Prejuizo 
            const operating_profit_loss = {
                budget: gross_profit.budget - expenses.budget - prolaborate.budget - investment.budget,
                accomplished: gross_profit.accomplished - expenses.accomplished - prolaborate.accomplished - investment.accomplished,
                arrow: compare(
                    gross_revenue.budget - expenses.budget - prolaborate.budget - investment.budget,
                    gross_revenue.accomplished - expenses.accomplished - prolaborate.accomplished - investment.accomplished
                )
            }

            setResult({
                cost,
                expenses,
                gross_profit,
                gross_revenue,
                investment,
                ner_revenue,
                prolaborate,
                tax,
                operating_profit_loss
            });

        }catch(error) {
            console.error(error);
            return result_default;
        }
    }

    function updateForm(value: any): void {
        reset({
            grossRevenue: value.grossRevenue,  
            tax: value.tax, 
            cost: value.cost, 
            expenses: value.expenses, 
            reinvestments: value.reinvestments, 
            personalExpenses: value.personalExpenses
        });
    }

    async function loadData(): Promise<void> {
        try {
            const response = await axiosConfig(`/dre/${date.month}/${date.year}`);

            if(!response.data.response) return;

            const budget = response.data.response.budget;
            const accomplished = response.data.response.accomplished;

            calc(budget, accomplished);

            form === "accomplished" && updateForm(accomplished);
            form === "budget" && updateForm(budget);

            setData({
                accomplished,
                budget
            });
        }catch(error) {
            console.error(error);
        }
    }

    async function save(values: any) {
        try {
            setSaveLoad(true);

            await axiosConfig(`/dre/${date.month}/${date.year}/${form}`, {
                method: "PATCH",
                data: values
            });

            setSaveLoad(false);
            loadData();
        }catch(error) {
            console.error(error);
            setSaveLoad(false);
        }
    }

    useEffect(() => {
        loadData();
    }, [date]);

    useEffect(() => {
        reset(data[form]);
    }, [form]);

    return (
        <>
            <div className={[styles.container, styles.navbar].join(" ")}>
                <Filter_data
                    className={styles.filterDate}
                    OnChangeDate={(e) => setDate(e)}
                />
            </div>
            
            <div className={[ styles.container, className, "bg-white", "border-r-8", "padding-16"].join(" ")}>
                <div className={[ styles.head, "flex", "space-between" ].join(" ")}>
                    <div className={styles.controllMode}>
                        <button 
                            className={form === "budget" ? styles.select : ""}
                            onClick={() => setForm("budget")}
                        ><span>Orçamento</span></button>

                        <button 
                            className={form === "accomplished" ? styles.select : ""}
                            onClick={() => setForm("accomplished")}
                        ><span>Realizado</span></button>
                    </div>
                </div>
                
                <DividerDefault className={["margin-h-16"].join(" ")}/>
                
                <form 
                    className={[styles.form, "f-column flex space-between"].join(" ")}
                    onSubmit={handleSubmit(save)}
                >
                    <div  className={[styles.inputsGrup].join(" ")}>
                        {inputs.map(({ key, label }: IInputs, i: number) => {
                            return (
                                <InputAndLabel 
                                    key={i}
                                    register={register(key, { valueAsNumber: true })} 
                                    label={label}
                                    className={styles.input}
                                />
                            )
                        })}
                    </div>

                    <button 
                        disabled={saveLoad}
                        className={[ styles.buttonSave, "border-r-8 bg-blue font-white margin-t-16", saveLoad && "cursor-load" ].join(" ")}
                    > {saveLoad ? "SALVANDO..." : "SALVAR"} </button>
                </form>
            </div>
                    
            {result &&
                <DreResultFinancial 
                    className={["margin-t-16"].join(" ")}
                    accomplished={data.accomplished}
                    budget={data.budget}
                    result={result}
                />
            }

        </>
    )
}