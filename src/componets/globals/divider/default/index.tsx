
import styles from "./styles.module.css";

interface IProps {
    className?: string;
}

export default function DividerDefault({ className }: IProps) {
    return (
        <hr className={[styles.divider, className].join(" ")}/>
    )
}