import React from "react";

import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";

interface IProps {
    label: string;
    description?: string;
    id: number;
}

export default function Card_AboutCompany_CulturalCode({ id, label, description }: IProps) {
    const navigate = useNavigate();

    return (
        <div className={styles.card}>
            <div className={styles.col}>
                <h3> {label} </h3>
                <p> {description}</p>
            </div>

            <div className={styles.col}>
                <button 
                    onClick={() => navigate(`open/${id}`)} 
                    title="Clique para abrir" 
                    id={styles.openButton}
                >abrir</button>
            </div>
        </div>  
    )
}