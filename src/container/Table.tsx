import SingleTableItem from "../components/SingleTableItem";
import {NumberType} from "../type/NumberType";

type TableProps = {
    allItems: NumberType[][],
    chosenColor: string,
    setColor: (row: number, cell: number, color: string) => void,
    format: boolean,
}

export default function Table(props: TableProps) {

    return (
        <div className={"table"}>
            {props.allItems
                .map(
                    (row, r) =>
                        <div
                            key={crypto.randomUUID()}
                            className={props.format ? "numberTableRow" : "numberTableRow2"}
                        >
                            {row.map((numberItem, c) =>
                                <SingleTableItem
                                    rowIndex={r}
                                    cellIndex={c}
                                    numberItem={numberItem}
                                    key={numberItem.number}
                                    actualColor={props.chosenColor}
                                    setColor={props.setColor}
                                    cellClassName={props.format ? "numberBox" : "numberBox2"}
                                />
                            )}
                        </div>
                )
            }
        </div>
    )
}
