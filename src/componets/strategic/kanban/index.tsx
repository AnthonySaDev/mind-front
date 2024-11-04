

import { decode } from "jsonwebtoken";
import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import { useLocation } from "react-router-dom";
import BuildingDev from "../../globals/dev/building";
import { axiosConfig } from "../../../ultils/axios";
import { cutText } from "../../../ultils/text";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { IUser } from "../../globals/menus/menu/ITypes";


interface ItemProps {
  id: string;
  content: string;
}


function KanbanTest() {
  const location = useLocation();
  const paths = location.pathname.split("/");
  const [user, setUser] = useState<IUser>()

  const date: string =  paths[5];
  const month: string = date.split("-")[1];
  const year: string = date.split("-")[2];
  
  const id: string = paths[6];

  const [data, setData] = useState<any[]>([]);
  const [cache, setCache] = useState<boolean>(false);
  const [timeResponse, setTimeResponse] = useState<number>(0);
  const [columns, setColumns] = useState<any[][]>([[], [], [], []]);

  async function loadData(): Promise<void> {
    try {
      const start = Date.now();
      const res = await axiosConfig(`/calendar/${id}/${month}/${year}`);
      const finish = Date.now()
      
      setTimeResponse(Math.floor((finish - start) % 1000));

      const _data: any[] = res.data.data;

      columns[0] = _data.filter(({ status }) => status === "À fazer");
      columns[1] = _data.filter(({ status }) => status === "Para aprovar");
      columns[2] = _data.filter(({ status }) => status === "Em progresso");
      columns[3] = _data.filter(({ status }) => status === "Feita");

      setColumns([...columns])

      setData(_data);
      setCache(res.data.infos.cache);
    }catch(error) {
      console.error(error);
    }
  }

  async function loadUser() {
    try {
      const token = Cookies.get("token-user");
      console.log(token);
  
      if(!token) return;
      const user: any = jwtDecode(token);
      setUser(user);
    }catch(error) {
      console.error(error);
    }
  } 

  useEffect(() => {
    loadData();
    loadUser();
  }, []);


  async function save(_data: any, index: number): Promise<void>  {
    try {
      console.log(_data)

      switch(index) {
        case 0:
          _data.status = "À fazer"
          break;

        case 1:
          _data.status = "Para aprovar"
          break;

        case 2:
          _data.status = "Em progresso"
          break;

        case 3:
          _data.status = "Feita"
          break;
      }

      console.log(_data)

      await axiosConfig(`/calendar/status/${id}/${_data.id}`, {
        method: "PATCH",
        data: {
          status: _data.status
        }
      });

      console.log("salvo com secesso")
    }catch(error) {
      console.error(error);
    }
  }

  const draggedItem = useRef<ItemProps | null>(null);
  const draggedFrom = useRef<number | null>(null);

  const handleDragStart = (item: ItemProps, columnIndex: number) => {
    draggedItem.current = item;
    draggedFrom.current = columnIndex;
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetIndex: number) => {
    e.preventDefault();

    save(draggedItem.current, targetIndex);

    if (draggedItem.current && draggedFrom.current !== null) {
      const updatedColumns = [...columns];

      // Remove o item da coluna original
      updatedColumns[draggedFrom.current] = updatedColumns[draggedFrom.current].filter(
        (i) => i.id !== draggedItem.current!.id
      );

      // Adiciona o item à nova coluna
      updatedColumns[targetIndex].push(draggedItem.current);
      

      setColumns(updatedColumns);

      // console.log(e.target)

      // Limpa as referências
      draggedItem.current = null;
      draggedFrom.current = null;
    }

  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div>
      {user?.email === "test@gmail.com" && <div className={styles.dev}>
        <p> date: {date}</p>
        <p> month: {month}</p>
        <p> year: {year}</p>
        <p> id: {id}</p>
        <p> cache data: {`${cache}`}</p>
        <p> size data: {data.length}</p>
        <p> time response: {timeResponse}ms</p>
      </div>}

      <div className={styles.table}>

        {columns.map((column, columnIndex) => (
          <div
            key={columnIndex}
            className={styles.column}
            onDrop={(e) => handleDrop(e, columnIndex)}
            onDragOver={handleDragOver}
          > 
            <div className={styles.title}>
              { columnIndex === 0 && "À fazer" }
              { columnIndex === 1 && "Para aprovar" }
              { columnIndex === 2 && "Em progresso" }
              { columnIndex === 3 && "Feita" }
            </div>

            {column.map((item, key) => {
              return (
                <div
                  draggable
                  key={key}
                  id={item.id}
                  title={item.label ? item.label : "sem nome"}
                  className={[styles.item, styles.dropzone].join(" ")}
                  onDragStart={() => handleDragStart(item, columnIndex)}
                >
                  <div className={styles.title}>
                    {cutText(item.label, 10)} <span>{item.date}</span>
                  </div>

                  <div className={styles.description}>
                    <p dangerouslySetInnerHTML={{ __html: cutText(item.text, 30) }}/>
                  </div>
                </div>
              )}
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default KanbanTest;