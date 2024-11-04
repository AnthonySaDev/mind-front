
import styles from "./styles.module.css";

interface IProps {
    text: string;
    imgSrc: string;
    selected?: boolean;
    onClick: () => void;
}

export default function SubItemMenu({ text, imgSrc, selected, onClick }: IProps) {
    return (
        <button 
            onClick={() => onClick()}
            className={[styles.subItemMenu, selected && styles.select].join(" ")}
        >
            <img src={imgSrc} alt="" /> {text}
        </button>
    )
}