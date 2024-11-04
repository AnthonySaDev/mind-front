import { IDataFile } from "../../../globals/uploadFiles";

export interface IFile {
    size: string;
    filename: string;
    path: string;
    type: string;
    filesCulturalCodeId: number;
}

export interface IData {
    hours: string;
    date: string;
    status: string;
    responsible: string;
    text: string;
    label: string;
    id?: string;
    cronogramaId?: number;
    everyDay?: boolean;
}

export const data: IData = {
    date: "01-01-2024",
    text: "",
    hours: "00:00",
    status: "",
    responsible: "",
    label: "",
    everyDay: false
}