import { text } from "stream/consumers";
import styles from "./styles.module.css";

interface IProps {
    className?: string;
    imgSrc?: string;
    title: string;
    text: string;
    finished?: boolean;

    onClick: () => void;  
}

export type ICardStrategic = IProps;
 
export default function CardStrategic({ className, onClick, imgSrc, title, text, finished }: IProps) {
    return (
        <div 
            className={[styles.container].join("")}
        >
            <div 
                className={[styles.card, className].join(" ")}
                onClick={() => finished && onClick()}
            >
                <h3> {imgSrc && <img src={imgSrc} alt="icon" />} {title} </h3>
                <p>{text}</p>
                
                {!finished && <div className={styles.building}>
                    Em breve
                </div>} 
                
            </div>
        </div>
    )
}