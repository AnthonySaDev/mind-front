import React, { useState } from "react";

import styles from "./styles.module.css";

import BuildingDev from "../../../../componets/globals/dev/building";
import Header from "../../../../componets/globals/header";
import Search from "../../../../componets/globals/inputs/search";
import SubMenu from "../../../../componets/globals/menus/subMenu";
import { useLocation, useNavigate } from "react-router-dom";
import BackButton from "../../../../componets/globals/buttons/backButton";
import Calendar_Strategic from "../../../../componets/strategic/calendar";
import DateAndMonth from "../../../../componets/globals/selects/dateAndMonth";
import moment from "moment-timezone";

export default function TimelineOpen() {
    const usenavigate = useNavigate();
    const location = useLocation()
    const id = location.pathname.split("/")[location.pathname.split("/").length - 1]
    const [date, setDate] = useState<{ month: string, year: string }>({ month: moment().format("MM"), year: moment().format("YYYY")  });

    return (
        <div className={["w-full", styles.container].join(" ")}>
            <Header
                title="Bem vindo, Mind Gestão!"
                showPrintOutButton={false}
            />

            <Search/>
            <SubMenu/>

            <BackButton onClick={() => usenavigate("/strategic/timeline")}/>

            <div className={styles.bar}>
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

            <Calendar_Strategic 
                month={date.month} 
                year={date.year}
                id={id!}
            />
        </div>
    )
}