import React from "react";

import styles from "./styles.module.css";

import { menuDafault } from "./data";
import { ISubMenu } from "./IType";
import { useLocation, useNavigate } from "react-router-dom";

interface IProps {
    data?: ISubMenu[]
}

export default function SubMenu({ data = menuDafault }: IProps) {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className={[styles.subMenu].join(" ")}>
            <ul>
                {data.map(({ label, to }: ISubMenu, key: number) => {
                    return (
                        <li 
                            key={key} 
                            onClick={() => navigate(to)}
                            className={[location.pathname.includes(to) && styles.select].join(" ")}
                        >{label}</li>
                    )
                })}
            </ul>
        </div>
    )
}