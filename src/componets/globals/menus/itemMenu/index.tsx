
import { useState } from "react";
import styles from "./styles.module.css";
import SubItemMenu from "../subItemMenu";
import Building from "../../../../layout/building";
import { useLocation, useNavigate, useParams } from "react-router-dom";

interface IProps {
    title: string;
    icon: string;
    path: string;
    fineshed: boolean;
    list: Array<{
        label: string;
        icon: string;
        path: string;
        fineshed: boolean;
    }>
}

export default function ItemMenu({ title, icon, list, path, fineshed }: IProps) {
    const navigate = useNavigate();
    const location = useLocation();

    const [showMenu, setShowMenu] = useState(false);
    const [showAlert, setShowAlert] = useState<boolean>(false);

    console.log(path.split("/")[1] + " - " + location.pathname.split("/")[1])

    return (
        <>
            {showAlert && <Building onClose={() => setShowAlert(false)}/>}

            <div className={[styles.itemMenu].join(" ")}>
                <button 
                    onClick={() => {
                        
                        if(fineshed) {
                            setShowMenu(!showMenu)
                            navigate(path)
                        }else {
                            setShowAlert(true);
                        }
                    }}
                    className={[
                        styles.item,
                        path.split("/")[1] == location.pathname.split("/")[1] && styles.select
                    ].join(" ")}
                >
                    <img src={icon} alt="icon" />
                    {title}
                </button>

                {showMenu && <ul className={[styles.subMenu].join(" ")}>
                    {list.map(({ icon, label, path, fineshed }, key) => {
                        return (
                            <SubItemMenu 
                                selected={path == location.pathname}
                                onClick={() => {
                                    if(fineshed) {
                                        navigate(path)
                                    }else {
                                        setShowAlert(true);
                                    }
                                }}
                                imgSrc={icon}
                                text={label}
                                key={key}
                            />
                        )
                    })}
                </ul>}
            </div>
        </>
    )
}