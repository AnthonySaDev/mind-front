






import styles from "./styles.module.css";

import { useEffect, useState } from "react";
import { previewFile } from "../../../ultils/file";
import { cutText } from "../../../ultils/text";
import { baseURL } from "../../../ultils/axios";
import { Link } from "react-router-dom";
import { effect } from "zod";




export interface IDataFile {
    size: string;
    filename: string;
    path: string;
    type: string;
    filesCulturalCodeId: number;
}

interface IProps {
    onSelect: (file: FileList) => void;
    dataFiles: Array<IDataFile>;
}

function UploadFiles({ dataFiles, onSelect }: IProps) {
    const [files, setFile] = useState<FileList>();
    const [data, setData] = useState<IDataFile[]>(dataFiles);

    useEffect(() => {
        files && onSelect(files);
        data && setData(data);
    }, [files,data]);

    return (
        <div
            className={styles.filesList}
        >
            {files && Array.from(files).map((file, key) => {

                return (
                    <div className={styles.file} key={key}>
                        <img width={"20px"} height={"20px"} src={previewFile(file, true)} alt="" />
                        <div className={styles.infos}>
                            <span title={file.name}> {cutText(file.name, 20)}</span>
                            <span>Tipo: {file.type}</span>
                            <span>Novo</span>
                        </div>
                    </div>
                )
            })}

            {dataFiles.map((file, key: any) => {

                return (
                    <div className={styles.file} key={key}>
                        <img
                            width={"20px"}
                            height={"20px"}
                            src={previewFile(file)}
                            alt=""
                        />

                        <div className={styles.infos}>
                            <span title={file.filename}> {cutText(file.filename, 20)} </span>
                            <span>Tipo: {file.type}</span>

                            <Link target="_blank" to={baseURL + file.path} download={true}>baixar</Link>
                        </div>
                    </div>
                )
            })}

            <label htmlFor="for" className={styles.upload}>
                <span> + </span>
                <input multiple  onChange={({ currentTarget }) => {
                    currentTarget.files && setFile(currentTarget.files)
                }} id="for" type="file" />
            </label>
        </div>
    )
}

export default UploadFiles