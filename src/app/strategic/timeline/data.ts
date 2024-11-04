import { ICardChart } from "../../../componets/strategic/chart/card";

export type IDataTimeLineAndKanbanBoard = Omit<ICardChart, "onClick" | "className"> & { href: string }

export const dataTimeLine: Array<IDataTimeLineAndKanbanBoard> = [
    {
        date: "10/10/2024",
        href: "42434",
        title: "Cronograma Jan 2024"
    },
    {
        date: "10/10/2024",
        href: "34324234232",
        title: "Cronograma Jan 2024"
    },
    {
        date: "10/10/2024",
        href: "4234343",
        title: "Cronograma Jan 2024"
    },
    {
        date: "10/10/2024",
        href: "32424343242354325345",
        title: "Cronograma Jan 2024"
    },
    {
        date: "10/10/2024",
        href: "322543532",
        title: "Cronograma Jan 2024"
    },
    {
        date: "10/10/2024",
        href: "524354525",
        title: "Cronograma Jan 2024"
    },
]

export const  dataKanbanBoard: Array<IDataTimeLineAndKanbanBoard>  = [
    {
        date: "10/10/2024",
        href: "3232",
        title: "Cronograma Jan 2024"
    },
    {
        date: "10/10/2024",
        href: "3232",
        title: "Cronograma Jan 2024"
    },
    {
        date: "10/10/2024",
        href: "3232",
        title: "Cronograma Jan 2024"
    },
    {
        date: "10/10/2024",
        href: "3232",
        title: "Cronograma Jan 2024"
    },
    {
        date: "10/10/2024",
        href: "3232",
        title: "Cronograma Jan 2024"
    },
    {
        date: "10/10/2024",
        href: "3232",
        title: "Cronograma Jan 2024"
    },
] 