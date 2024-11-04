import styles from "./styles.module.css";

interface IProps {
    className?: string;
    label: string;
    register?: any;
    value?: string;
    disabled?: boolean;
}

export default function InputAndLabel({ label, className, register, value, disabled = false }: IProps) {
    const id = `${label.replace(/ /g, "-")}-${Date.now()}`;

    return (
        <div className={[className, styles.inputAndLabel].join(" ")}>
            <label className={["block"].join(" ")} htmlFor={id}>{label}</label>
            <input disabled={disabled} value={value} {...register} className={["block"].join(" ")} id={id} type="text" />
        </div>
    )
}