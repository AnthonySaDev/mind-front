
import styles from "./styles.module.css";

interface IProps {
    head: Array<string>;
    body: Array<Array<string>>;
    className: string;
}

export default function TableCashFlow({ head, body, className }: IProps) {
    return (
        <table className={[styles.table, className].join(" ")}>
            <thead className={[styles.head].join(" ")}>
                <tr> {head.map((text, key) => <th key={key}><span>{text}</span></th>)} </tr>
            </thead>

            <tbody className={[styles.body].join(" ")}>
                {body.map((list) => {
                    return (
                        <tr>
                            {
                                list.map((text, key) => {
                                    return  <td key={key}>{text}</td>
                                })
                            }
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}