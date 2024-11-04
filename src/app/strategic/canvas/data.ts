import { ICardChart } from "../../../componets/strategic/chart/card";

export type IDataCanvas = Omit<ICardChart, "onClick"> & { href: string }



export const dataCanvas: Array<IDataCanvas> = [
    {
        title: "Quadro X",
        date: "02/11/2023",
        href: "493i4839"
    
    },
    {
        title: "Quadro Y",
        date: "02/11/2023",
        href: "9283928"
    }

] 