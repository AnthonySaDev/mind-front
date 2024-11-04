import { ICardChart } from "../../../componets/strategic/chart/card";

export type IDataChart = Omit<ICardChart, "onClick"> & { href: string }

export const dataChart: Array<IDataChart> = [
    {
        title: "Reunião Evento Natal",
        href: "943734",
        date: "02/11/2023",
    },
    {
        title: "Projeto Marketing",
        href: "3823832",
        date: "02/11/2023",
    },
    {
        title: "Mapa Mental App",
        href: "9832984",
        date: "02/11/2023",
    },
    {
        title: "Mapa Mental App",
        href: "8923898",
        date: "02/11/2023",
    },
    {
        title: "Projeto X",
        href: "843289",
        date: "02/11/2023",
    }
    
]