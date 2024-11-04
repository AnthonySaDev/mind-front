import { ICardChart } from "../../../componets/strategic/chart/card";

export type IDataActionPlan = Omit<ICardChart, "onClick"> & { href: string }

export const dataActionPlan: Array<IDataActionPlan>  = [
    {
        date: "02/01/2024",
        href: "00384830",
        title: "Plano - Jan 2024"
    },
    {
        date: "02/01/2024",
        href: "00384830",
        title: "Plano - Jan 2024"
    },
    {
        date: "02/01/2024",
        href: "00384830",
        title: "Plano - Jan 2024"
    },
    {
        date: "02/01/2024",
        href: "00384830",
        title: "Plano - Jan 2024"
    },
    {
        date: "02/01/2024",
        href: "00384830",
        title: "Plano - Jan 2024"
    },
    {
        date: "02/01/2024",
        href: "00384830",
        title: "Plano - Jan 2024"
    },
]