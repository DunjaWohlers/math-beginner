import {useState} from "react";
import {NumberType} from "../type/NumberType";

type TableOfNumbersSingleBoxProps = {
    rowIndex: number,
    cellIndex: number,
    numberItem: NumberType,
    actualColor: string,
    setColor: (row: number, cell: number, color: string) => void,
    cellClassName: string,
}

export default function SingleTableItem(props: TableOfNumbersSingleBoxProps) {

    const [color, setColor] = useState<string>(props.numberItem.color)

    const handleClick = () => {
        setColor(props.actualColor);
        props.setColor(props.rowIndex, props.cellIndex, props.actualColor);
    }

    return (
        <button
            onClick={handleClick}
            className={props.cellClassName}
            key={props.numberItem.number}
            style={{backgroundColor: "#" + color}}
        > {props.numberItem.number}
        </button>
    )
}
