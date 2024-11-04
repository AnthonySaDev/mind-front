import React from "react";

import styles from "./styles.module.css"

interface IInputGrup {
    label: string;
    disabled?: boolean;
    className?: string;
    register?: any;
    defaultValue?: any;
    type: "text" | "number"
}

export default function InputGrupStrategic({ label, disabled, className, register, type, defaultValue }: IInputGrup) {
    const dateNow = Date.now();

    return (
        <div className={[styles.inputGrup, className].join(" ")}>
            <label htmlFor={`${dateNow}-${label}`}>{label}</label>
            <input {...register} disabled={disabled} value={defaultValue} type={type}  id={`${dateNow}-${label}`}/>
        </div>  
    )
}

