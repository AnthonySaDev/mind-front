export interface IData {
    grossRevenue: number; // Receita bruta
    tax: number; // Imposto
    cost: number; // Custo
    expenses: number; // Dispesas
    reinvestments: number; // Reivestimentos
    personalExpenses: number; // Despesas Pessoais
}

export const data_default: IData = {
    grossRevenue: 0, // Receita bruta
    tax: 0, // Imposto
    cost: 0, // Custo
    expenses: 0, // Dispesas
    reinvestments: 0, // Reivestimentos
    personalExpenses: 0, // Despesas Pessoais
}







export interface IResult {
    grossRevenue: "up" | "down" | "same"; // Receita bruta
    tax: "up" | "down" | "same"; // Imposto
    cost: "up" | "down" | "same"; // Custo
    expenses: "up" | "down" | "same"; // Dispesas
    reinvestments: "up" | "down" | "same"; // Reivestimentos
    personalExpenses: "up" | "down" | "same"; // Despesas Pessoais
}

export const result_default: IResult = {
    grossRevenue: "same", // Receita bruta
    tax: "same", // Imposto
    cost: "same", // Custo
    expenses: "same", // Dispesas
    reinvestments: "same", // Reivestimentos
    personalExpenses: "same", // Despesas Pessoais
}












export interface IInputs {
    label: string;
    key: any;
}

export const inputs: IInputs[] = [
    { label: "Receita bruta:", key: "grossRevenue" },
    { label: "Imposto:", key: "tax" },
    { label: "Custo:", key: "cost" }, 
    { label: "Despesas:", key: "expenses" },
    { label: "Reinvestimentos:", key: "reinvestments" },
    { label: "Pró-labore", key: "personalExpenses" }
];

export const inputs2: IInputs[] = [
    { label: "Receita bruta:", key: "gross_revenue" },
    { label: "Imposto:", key: "tax" },
    { label: "Custo:", key: "cost" }, 
    { label: "Despesas:", key: "expenses" },
    { label: "Investimento:", key: "reinvestments" },
    { label: "Pró-labore", key: "prolaborate" }
];