import { useEffect, useState } from "react";
import DateAndMonth from "../dateAndMonth";

import styles from "./styles.module.css";
import moment from "moment-timezone";

interface IData { 
    month: string, 
    year: string
}

interface IProps {
    OnChangeDate: (value: IData) => void;
    className?: string;
}

function Filter_data({ OnChangeDate, className }: IProps) {
    const [date, setDate] = useState<{ month: string, year: string }>({ month: moment().format("MM"), year: moment().format("YYYY")  });

    useEffect(() => {
        OnChangeDate(date);
    }, [date]);

    return (
        <div className={[styles.containerDate, className].join(" ")}>
            <DateAndMonth
                data={[
                    { value: "01", label: "01" },
                    { value: "02", label: "02" },
                    { value: "03", label: "03" },
                    { value: "04", label: "04" },
                    { value: "05", label: "05" },
                    { value: "06", label: "06" },
                    { value: "07", label: "07" },
                    { value: "08", label: "08" },
                    { value: "09", label: "09" },
                    { value: "10", label: "10" },
                    { value: "11", label: "11" },
                    { value: "12", label: "12" },
                ]}
                onSelect={({ value }) => setDate({ month: value, year: date.year })}
                select={{ label: date.month, value: date.month }}
            />

            <DateAndMonth
                data={[
                    { value: "2024", label: "2024" },
                    { value: "2025", label: "2025" },
                    { value: "2026", label: "2026" },
                    { value: "2027", label: "2027" },
                    { value: "2028", label: "2028" },
                    { value: "2029", label: "2029" },
                    { value: "2030", label: "2030" },
                ]}
                onSelect={({ value }) => setDate({ month: date.year, year: value })}
                select={{ label: date.year, value: date.year }}
            />
        </div>
    )
}

export default Filter_data;