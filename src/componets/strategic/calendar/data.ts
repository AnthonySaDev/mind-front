
interface IData {
    month: string;
    day: string;
    text: string;
    hours: string;
}

const data: Array<IData> = [
    { month: "08", day: "01", text: "Caroba", hours: "14:00" },
    { month: "08", day: "01", text: "gay", hours: "14:00" },
    { month: "08", day: "01", text: "senna", hours: "14:00" },
    { month: "08", day: "01", text: "senna", hours: "14:00" },


    { month: "08", day: "09", text: "Pinto", hours: "13:00" },
    { month: "08", day: "10", text: "Galinha", hours: "14:00" }


]

export {data, IData};