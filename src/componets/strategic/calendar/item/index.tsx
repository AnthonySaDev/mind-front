import { DragEventHandler, useRef, useState } from "react";

import styles from "./styles.module.css";
import { IData } from "../edit/data";

interface IProps {
    data: Array<IData>;
    day: string;
    onClick: (id: any) => void;
    onDrop?: DragEventHandler;
    onDragOver?: DragEventHandler<any>
}

function Item_Calendar_Strategic({ data, day, onClick, onDrop, onDragOver }: IProps) {
    const [isDown, setIsDown] = useState<boolean>(false);
    const [startY, setStartY] = useState<number>(0);
    const [scrollTop, setScrollTop] = useState<number>(0);
    
    const ref_item = useRef<HTMLDivElement>(null);

    function handleMouseDown(e: React.MouseEvent<HTMLDivElement>): void {
        if(ref_item.current) {
            setIsDown(true);
            setStartY(e.pageY - ref_item.current.getBoundingClientRect().top);
            setScrollTop(ref_item.current.scrollTop);
            ref_item.current.style.cursor = 'grabbing';
        }
    }

    function handleMouseLeave(): void {
        if(ref_item.current) {
            setIsDown(false);
            ref_item.current.style.cursor = 'grab';
        }
    };

    function handleMouseUp(): void {
        if(ref_item.current) {
            setIsDown(false);
            ref_item.current.style.cursor = 'grab';
        };
    };

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>): void {
        if (isDown && ref_item.current) {
            e.preventDefault();
            const y = e.pageY - ref_item.current.getBoundingClientRect().top;
            const distance = y - startY;
            ref_item.current.scrollTop = scrollTop - distance;
        };
    };
    
    return (
        <div
            ref={ref_item}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className={styles.container}
        >
            {data.map((_data: IData, key) => {
                let statusColor = "";

                switch(_data.status) {
                    case "À fazer":
                        statusColor = "#db3f3f";
                        break;

                    case "Para aprovar":
                        statusColor = "#ffb405";
                        break;

                    case "Em progresso":
                        statusColor = "#0077BA";
                        break;

                    case "Feita":
                        statusColor = "#138f3a";
                        break;
                }

                return (
                    <>
                        { _data.date.split("-")[2] == day &&
                        
                        <div 
                            className={styles.item} 
                            key={key}
                            onClick={() => onClick(_data)}
                        >
                            <div 
                                className={[styles.item_DayCard].join(" ")}
                                style={
                                    { background: statusColor, }
                                }
                            >
                                <p>{_data.label}</p>
                                <span>{_data.hours}h</span>
                            </div>
                        </div>
                        }   

                        { _data.date.split("-")[2] != day && _data.everyDay &&
                        
                        <div 
                            className={styles.item} 
                            key={key}
                            onClick={() => onClick(_data)}
                        >
                            <div 
                                className={[styles.item_DayCard].join(" ")}
                                style={
                                    { background: statusColor, }
                                }
                            >
                                <p>{_data.label}</p>
                                <span>{_data.hours}h</span>
                            </div>
                        </div>
                        }
                    </>
                )
            })}
        </div>
    )
}

export default Item_Calendar_Strategic;
