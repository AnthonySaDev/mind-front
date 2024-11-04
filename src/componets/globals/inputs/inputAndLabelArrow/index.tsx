import styles from "./styles.module.css";

interface IIProps {
    type: "up" | "down";
    className?: string;
    label: string;
}

export default function InputAndLabelArrow({ type, className, label }: IIProps) {
    const id = `${label.replace(/ /g, "-")}-${Date.now()}`;

    return (
        <div className={[styles.container, className].join(" ")}>
            <label htmlFor={id}>{label}</label>

            <div className={[styles.grup].join(" ")}>
                <input id={id} type="text" />
                {type === "up" && <img src="/icons/inputs/arrow-up.svg" alt="icon"/>}
                {type === "down" && <img src="/icons/inputs/arrow-up.svg" alt="icon"/>}
            </div>
        </div>
    )
}