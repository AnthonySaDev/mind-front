import CompactedButtonDefault from "../compactedButtonDefault";

import styles from "./styles.module.css";

interface IProps {
    className?: string;
}

export default function FilterButton({ className }: IProps) {
    return (
        <CompactedButtonDefault className={[styles.filterButton, className].join(" ")} title="Filtros" imgSrc="/icons/filter.svg"/>
    )
}