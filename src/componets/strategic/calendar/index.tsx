import { useEffect, useState } from "react";
import React, {  useRef, CSSProperties } from 'react';

import 'react-awesome-slider/dist/styles.css';

import "./stylesSlide.css"

import styles from "./styles.module.css";
import moment from "moment-timezone";
import "slick-carousel/slick/slick.css";

import "slick-carousel/slick/slick-theme.css";
import Item_Calendar_Strategic from "./item";
import Modal_Event_Calendar_Strategic from "./edit";
import { axiosConfig } from "../../../ultils/axios";
import { IData } from "./edit/data";

interface IProps {
    month: string;
    year: string;
    id: string;
}

interface ItemProps {
    id: string;
    content: string;
  }
  
 
function Calendar_Strategic({ month, year, id }: IProps) {
    const [calendarData, setCalendarData] = useState<Array<Array<string>>>([]);
    const [data, setData] = useState<Array<IData>>([]);
    const [show, setShow] = useState<boolean>(false);

    const [daySelect, setDaySelect] = useState<string>("");
    const [item_select, setItemSelect] = useState<IData>();

    async function loadData(): Promise<void> {
        try { 
            const res = await axiosConfig(`/calendar/${id}/${month}/${year}`);

            const newData: Array<IData> = res.data.data.map((_data: any): IData => {
                return {
                    text: _data.text,
                    hours: _data.hours,
                    date: _data.date,
                    responsible: _data.responsible,
                    status: _data.status,
                    label: _data.label,
                    id: _data.id,
                    cronogramaId: _data.id_,
                    everyDay: _data.everyDay,

                }
            });

            setData([...newData]);
        }catch(error) { console.error(error); }
    }

    async function laodTable(): Promise<void> {
        try {
            const monthLength = moment(`${year}-${month}-01`, 'YYYY-MM-DD').daysInMonth();
            const week_default = new Array(7).fill("-1");
            const newCalendarData: Array<Array<string>> = [week_default, [], [], [], []];
    
            for(let day = 1; day <= monthLength; day++) {
                const currentDate = moment(`${year}-${month}-${day}`, 'YYYY-MM-DD');
                const weekIndex  = currentDate.week() - moment(currentDate).startOf('month').week();
                const dayOfWeek = currentDate.format("DD");


                console.log(weekIndex, dayOfWeek)

                // newCalendarData[weekIndex] = new Array(7).fill("-1");
                // console.log(newCalendarData[weekIndex])
                // console.log(newCalendarData[weekIndex][dayOfWeek] = currentDate.format('DD'))
                
                // console.log(newCalendarData[weekIndex].length == 0)
                // console.log(new Array(7).fill("-1"))
                // if (!newCalendarData[weekIndex]) {
                // }
                
                // console.log(newCalendarData)
                // if (!newCalendarData[weekIndex]) {
                //     newCalendarData[weekIndex] = new Array(7).fill("-1");
                // }

                newCalendarData[weekIndex][day + 1] = dayOfWeek;
                // console.log(newCalendarData[weekIndex][dayOfWeek])

            }
    
            setCalendarData([...newCalendarData]);
        }catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        laodTable();
        loadData();
    }, [month, year]);


    function update(last: IData, now: IData) {
        const index = data.indexOf(last);
        data[index] = now;
        setData([...data]);
    }

    function create(newData: IData) {
        setData([...data, newData]);
    }

    function remove(_data: IData) {
        const index = data.indexOf(_data);
        if(index > -1) data.splice(index, 1);
        setData([...data]);
    }



    const draggedItem = useRef<ItemProps | null>(null);
    const draggedFrom = useRef<number | null>(null);
  
    const handleDragStart = (item: ItemProps, columnIndex: number) => {
      draggedItem.current = item;
      draggedFrom.current = columnIndex;
    };
  
    const handleDrop = (e: any, indexWeek: number, indexDay: any) => {
        e.preventDefault();


        console.log(indexWeek, indexDay)
        console.log(calendarData)
        console.log(e.target)
        // console.log(e)



    //   console.log(draggedItem.current, targetIndex)
  
    // //   save(draggedItem.current, targetIndex);
  
    //   if (draggedItem.current && draggedFrom.current !== null) {
    //     const updatedColumns = [...columns];
  
    //     // Remove o item da coluna original
    //     updatedColumns[draggedFrom.current] = updatedColumns[draggedFrom.current].filter(
    //       (i) => i.id !== draggedItem.current!.id
    //     );
  
    //     // Adiciona o item à nova coluna
    //     updatedColumns[targetIndex].push(draggedItem.current);
        
  
    //     setColumns(updatedColumns);
  
    //     // console.log(e.target)
  
    //     // Limpa as referências
    //     draggedItem.current = null;
    //     draggedFrom.current = null;
    //   }
  
    };
  
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
    };



    return (
        <div className={styles.container}>
            {show && <Modal_Event_Calendar_Strategic
                id={id}
                date={`${year}-${month}-${daySelect}`}
                onClose={() => {
                    setShow(false);
                    setItemSelect(undefined);
                }}
                onUpdate={(last, now, method) => {
                    if(method === "update") update(last, now);
                    if(method === "create") create(now);
                    if(method === "delete") remove(now);

                    setShow(false);
                    setItemSelect(undefined);
                }}
                data={item_select}
            />}

            <div className={styles.label}>
                <div> Domingo </div>
                <div> Segunda </div>
                <div> Terça </div>
                <div> Quarta </div>
                <div> Quinta </div>
                <div> Sexta </div>
                <div> Sabado </div>
            </div>

            <div className={styles.week}>
                {calendarData?.map((week: Array<string>, indexWeek: number) => {
                    return(
                        week.map((day: string, indexDay: number) => {
                            return (
                                <div 
                                    className={styles.dayCard} 
                                    key={indexDay}
                                    
                                    
                                    >
                                    {day !== "-1" &&
                                        <>
                                            <div className={styles.infos_DayCard}>
                                                <span> {day} </span>
                                                
                                                <button
                                                    onClick={() => {
                                                        setShow(true);
                                                        setDaySelect(day);
                                                    }}
                                                    >+</button>
                                            </div>
                                        
                                            <div className={styles.list_DayCard} style={{ height:"250px" }}
                                  
                                            
                                            >
                                                <Item_Calendar_Strategic 
                                                    data={data} 
                                                    day={day}  
                                                    key={indexDay} 
                                                    onDragOver={handleDragOver}
                                                    onDrop={e => handleDrop(e, indexWeek, indexDay)}
                                                    onClick={(id) => {
                                                        setItemSelect(id);
                                                        setShow(true);
                                                    }}
                                                />
                                            </div>
                                        </>
                                    }
                                </div>
                            )
                        })
                    )
                })}
                


            </div>
        </div>  
    )
}

export default Calendar_Strategic;
