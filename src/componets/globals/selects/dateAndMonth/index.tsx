

import React, { useState } from "react";

import styles from "./styles.module.css";
import { string } from "zod";

interface IProps {
    select: IData;
    onSelect: (value: IData) => void;
    data: Array<IData>;
}

interface IData { value: string, label: string }

function DateAndMonth({ data, select, onSelect }: IProps) {
    const [open, setOpen] = useState(false);

    return (
        <div className={styles.select}>
            <span 
                className={styles.title}
                onClick={() => setOpen(!open)}
            >
                {select.label}
            </span>

            {open && <div className={styles.lists} >
                {data.map(({ label, value }: IData, key: number) => {
                    return (
                        <div 
                            className={styles.item}
                            key={key}
                            onClick={() => {
                                onSelect({ label, value });
                                setOpen(false);
                            }}
                        >
                            <span> {value} </span> 
                        </div>
                    )
                })}
            </div>}

        </div>
    )
}

export default DateAndMonth;