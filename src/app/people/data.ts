import { ICardChart } from "../../componets/strategic/chart/card";

export type IDataPeoples = Omit<ICardChart, "onClick"> & { href: string }

export  const dataPeoples: Array<IDataPeoples> = [
    
]