import React from "react";

import styles from "./styles.module.css";

interface IProps {
    onClose?: () => void;
}

export default function Building({ onClose }: IProps) {
    return (
        <div className={[styles.container].join(" ")}>
            <div className={[styles.alert].join(" ")}>
                <h1>Em Breve!</h1>
                <hr />
                <p>Esta funcionalidade do sistema Mind ainda está sendo preparada para você! Agradecemos sua compreensão e paciência. Fique atento às atualizações.</p>
                <button onClick={() => onClose && onClose()}> voltar </button>
            </div>  
        </div>
    )
}