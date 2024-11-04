import React from "react";

import moment from "moment-timezone";
import { Calendar, Whisper, Popover, Badge } from 'rsuite';
import 'rsuite/Calendar/styles/index.css';

import BackButton from "../../../globals/buttons/backButton";
import ContainerWithBordes from "../../../globals/containerWithBordes";

import styles from "./styles.module.css";

import "./styles.css";

interface IProps {
    onBack: () => void;
    date: {
        year: string;
        month: string;
    }
}

function getTodoList(date: any) {
    const day = date.getDate();
  
    switch (day) {
      case 10:
        return [
          { time: '10:30 am', title: 'Meeting' },
          { time: '12:00 pm', title: 'Lunch' }
        ];
      case 15:
        return [
          { time: '09:30 pm', title: 'Products Introduction Meeting' },
          { time: '12:30 pm', title: 'Client entertaining' },
          { time: '02:00 pm', title: 'Product design discussion' },
          { time: '05:00 pm', title: 'Product test and acceptance' },
          { time: '06:30 pm', title: 'Reporting' },
          { time: '10:00 pm', title: 'Going home to walk the dog' }
        ];
      default:
        return [];
    }
  }


export default function EditTimeline({ onBack, date }: IProps) {
    function renderCell(date: any) {
        const list = getTodoList(date);
        const displayList = list.filter((item, index) => index < 2);
    
        if (list.length) {
          const moreCount = list.length - displayList.length;

    
          return (
            <ul  className={[""].join(" ")}>
              {displayList.map((item, index) => (
                <li key={index} >
                   <b>{item.time}</b>
                </li>
              ))}
              {/* {moreCount ? moreItem : null} */}
            </ul>
          );
        }
    }

    return (


        <div>
            <BackButton onClick={() => onBack()}/>
            <ContainerWithBordes 
                className={[styles.editTimeline].join(" ")}
            >
                <div>
                    <h1>Cronograma Jan 2024</h1>
                    <p><img src="/icons/pencil.svg" alt="" />Descrição do Cronograma: Aqui tem uma breve descrição editável sobre o cronograma criado abaixo.</p>
                    <p><img src="/icons/pencil.svg" alt="" />Responsável: Marcos Silva -  P.O</p>
                </div>
               

                <div className={[styles.calendar].join(" ")}>
                    <Calendar 
                        bordered  
                        renderCell={renderCell}
                        className={styles.test}
                        locale={{
                            saturday: "Sábado",
                            sunday: "Domingo",
                            monday: "Segunda",
                            tuesday: "Terça",
                            wednesday: "Quarta",
                            thursday: "Quinta",
                            friday: "Sexta"
                        }}
                        // classPrefix={styles.test}
                        
                    />;
                </div>


            </ContainerWithBordes>


        </div>
    )
}



/*

                    <div className={[styles.column].join(" ")}>
                        <div> Domingo </div>
                        {listDay.sunday.map((day, key) => {
                            return (
                                <div key={key}> {day} </div>
                            )
                        })}
                    </div>

                    <div className={[styles.column].join(" ")}>
                        <div> Segunda-feira </div>
                        {listDay.monday.map((day, key) => {
                            return (
                                <div key={key}> {day} </div>
                            )
                        })}
                    </div>

                    <div className={[styles.column].join(" ")}>
                        <div> Terça-feira </div>
                        {listDay.tuesday.map((day, key) => {
                            return (
                                <div key={key}> {day} </div>
                            )
                        })}
                    </div>

                    <div className={[styles.column].join(" ")}>
                        <div> Quarta-feira </div>
                        {listDay.wednesday.map((day, key) => {
                            return (
                                <div key={key}> {day} </div>
                            )
                        })}
                    </div>

                    <div className={[styles.column].join(" ")}>
                        <div> Quinta-feira </div>
                        {listDay.thursday.map((day, key) => {
                            return (
                                <div key={key}> {day} </div>
                            )
                        })}
                    </div>
                    
                    <div className={[styles.column].join(" ")}>
                        <div> Sexta-feira </div>
                        {listDay.friday.map((day, key) => {
                            return (
                                <div key={key}> {day} </div>
                            )
                        })}
                    </div>

                    <div className={[styles.column].join(" ")}>
                        <div> Sabado </div>
                        {listDay.saturday.map((day, key) => {
                            return (
                                <div key={key}> {day} </div>
                            )
                        })}
                    </div>
*/