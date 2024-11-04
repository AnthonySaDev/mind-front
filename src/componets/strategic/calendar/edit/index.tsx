import { Editor } from "primereact/editor";
import styles from "./styles.module.css";
import "./styles.css"
import UploadFiles, { IDataFile } from "../../../globals/uploadFiles";
import { axiosConfig } from "../../../../ultils/axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { data as dataDefault, IData, IFile } from "./data";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";

interface IProps {
    onClose: () => void;
    date: string;
    id: string;
    data?: IData;
    onUpdate: (last: IData, now: IData, method: "create" | "update" | "delete") => void;
}

function Modal_Event_Calendar_Strategic({ onClose, date, id, data, onUpdate }: IProps) {
    const [files, setFile] = useState<FileList>();
    const [dataFile, setDataFile] = useState<Array<IDataFile>>([]);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset
      } = useForm<IData>({
        mode: 'onChange',
        defaultValues: data ? {
            ...data,
            cronogramaId: parseInt(id)
        } : {
            ...dataDefault,
            cronogramaId: parseInt(id),
            status: "À fazer",
            date
        }
    }); 

    async function uploadFiles(): Promise<IFile[] | undefined> {
        try {
            const filesUpload = await axiosConfig(`/files/upload`, {
                method: "POST",
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                data: {
                    file: files
                }
            });

            return filesUpload.data.files;
        }catch(error) { console.log(error) }
    }

    async function save(_data: any) {
        try {
            if(!_data?.hours) return;
            if(data) {
                update(_data);   
              return;
            }

            const files: IFile[] | undefined = await uploadFiles();

            console.log(_data)

            const res = await axiosConfig("/calendar", {
                method: "post",
                data: {
                    date,
                    files,
                    id_: id,
                    ..._data
                }   
            });

            onUpdate(data!, {
                date,
                hours: _data.hours,
                responsible: _data.responsible,
                status: _data.status,
                text: _data.text,
                label: _data.label,
                id: res.data.id,
                cronogramaId: parseInt(id),
                everyDay: _data.everyDay
            }, "create");
        }catch(error) { console.error(error) }
    }

    async function update(_data: any) {
        try {
            const files: IFile[] | undefined = await uploadFiles();

            console.log(_data)

            const res = await axiosConfig(`/calendar/${id}/${data?.id}`, {
                method: "patch",
                data: {
                    hours: _data.hours,
                    responsible: _data.responsible,
                    status: _data.status,
                    text: _data.text,
                    label: _data.label,
                    date: _data.date,
                    everyDay: _data.everyDay,
                    files
                }   
            });

            console.log(res.data)

            onUpdate(data!, {
                date: _data.date,
                hours: _data.hours,
                responsible: _data.responsible,
                status: _data.status,
                text: _data.text,
                label: _data.label,
                id: _data.id,
                everyDay: _data.everyDay,
                cronogramaId: parseInt(id)
            }, "update");
        }catch(error) { console.error(error) }
    }

    async function remove(): Promise<void> {
        try {
            await axiosConfig(`/calendar/${id}/${data?.id}`, {
                method: "delete"
            });
            
            onUpdate(data!, data!, "delete");
        }catch(error) { console.error(error) }
    }

    async function loadFile(): Promise<void> {
        try {
            const res = await axiosConfig(`/calendar/${id}/${data?.id}`);
            setDataFile(res.data);
        }catch(error) { console.error(error) }
    }

    useEffect(() => {
        if(data?.id) loadFile();
        reset(data);
    }, [data]);

    

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <button
                    onClick={onClose}
                >
                    <img className={styles.buttonClose} src="/icons/strategic/timeline/edit/close.svg" alt="" />
                </button>

                <form 
                    className={styles.form}
                    onSubmit={handleSubmit(save, (e) => console.error(e))}
                >
                    <div className={styles.title}>
                       <span>Tarefa:</span> 
                       <input  {...register("label")} type="text" placeholder="Lançamento Unidade Nova Esperança"/>
                       <img src="/icons/strategic/timeline/edit/edit.svg" alt="" /> 
                    </div>

                    <div className={styles.row}> 
                        <div className="flex">
                            <img src="/icons/strategic/timeline/edit/date.svg"/> 
                            <span> Date: </span>
                        </div>
                        
                        <div className={styles.time}>
                            <input {...register("date")}  type="date"/> 
                            <input {...register("hours")} type="time"/>
                        </div>
                    </div>

                    <div className={styles.row}> 
                        <div className="flex">
                            <span> Todos os dias: </span>
                        </div>
                        
                        <div className={styles.checkbox}>
                            <input  {...register("everyDay")} type="checkbox" placeholder="Lançamento Unidade Nova Esperança"/>
                        </div>
                    </div>
                    
                    
                    <div className={styles.row}> 
                        <div className="flex">
                            <img src="/icons/strategic/timeline/edit/status.svg"/> 
                            <span> Status: </span> 
                        </div>

                        <div className={styles.container_select}>
                            <select 
                                {...register("status")} 
                                className={styles.selectStatus}
                            >
                                <option value={"À fazer"}> À fazer </option>
                                <option value={"Para aprovar"}> Para aprovar </option>
                                <option value={"Em progresso"}> Em progresso </option>
                                <option value={"Feita"}> Feita </option>
                            </select>
                        </div>
                    </div>
                    
                    <div className={styles.row}> 
                        <div className="flex">
                            <img src="/icons/strategic/timeline/edit/responsible.svg"/> 
                            <span> Responsável: </span>
                        </div>
                        
                        <div className={styles.container_select}>
                            <select 
                                {...register("responsible")} 
                            >
                                <option value="">Selecionar <img src="/icons/strategic/timeline/edit/proflile.png" alt="" /></option>
                                <option value="pedro">Pedro <img src="/icons/strategic/timeline/edit/proflile.png" alt="" /></option>
                            </select>
                        </div>
                    </div>

                    <h2>  <img src="/icons/strategic/timeline/edit/msg.svg"/> Add comentário...</h2>
                    <Editor
                        className={["editor", styles.editor].join(" ")}  
                        value={watch("text")} 
                        onTextChange={(e) => {
                            setValue("text", e.htmlValue!)
                        }}
                        style={{ height: '400px' }}
                        
                    />
                    
                    <h2>  <img src="/icons/strategic/timeline/edit/copy.svg"/> Add anexos...</h2>
                    <UploadFiles
                        onSelect={e => setFile(e)}
                        dataFiles={dataFile}
                    />
                    
                    <div className={styles.buttons}>
                        {data && <button 
                            className={styles.delete}
                            onClick={remove}
                        >Deletar</button>}

                        <button 
                            className={styles.saveButton}
                            onClick={save}
                        >salvar</button>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default Modal_Event_Calendar_Strategic;
