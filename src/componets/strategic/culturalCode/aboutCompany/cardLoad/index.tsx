import React from "react";

import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";

interface IProps {
}

export default function Card_AboutCompany_CulturalCodeLoad({ }: IProps) {
    const navigate = useNavigate();

    return (
        <div className={styles.card}>
            <div className={styles.col}>
                <h3> </h3>
                <p> </p>
            </div>

            <div className={styles.col}>
                <button 
                    onClick={() => navigate(`open/`)} 
                    title="Clique para abrir" 
                    id={styles.openButton}>
                        
                </button>
            </div>
        </div>  
    )
}