import {useEffect, useState} from 'react';
import {NumberType} from '../type/NumberType';
import ColorPicker from './ColorPicker';
import './tableOfNumbers.css';
import TableOfNumbersSingleBox from './TableOfNumbersSingleBox';
import {allColors} from "../functions/allColors";

type TableOfNumbersProps = {
    maximum: number,
}

export default function TableOfNumbers(props: TableOfNumbersProps) {

    useEffect(() => {
            loadColors();
            loadItems();
        }
        , [])

    let [myColors, setMyColors] = useState<string[]>([]);

    const numberArray = () => {

        let numberOfRows = props.maximum / 10;
        let ar: NumberType[][] = new Array(numberOfRows).fill([]);

        let rowStart = 0;
        let rowEnd = 10;

        ar = ar.map((row, r) => {
            let rowArray = [];
            rowStart = (props.maximum / numberOfRows) * (r);
            rowEnd = (props.maximum / numberOfRows) * (r + 1);
            for (let i = rowStart; i < rowEnd; i++) {
                rowArray.push(
                    {number: i + 1, color: ""}
                );
            }
            return rowArray;
        });
        return ar;
    }
    const [showColor, setShowColor] = useState<boolean>(false)

    const [chosenColor, setChosenColor] = useState<string>("");
    const [allItems, setAllItems] = useState<NumberType[][]>(numberArray());

    const setColor = (row: number, cell: number, color: string) => {
        const newArray: NumberType[][] = allItems;
        newArray[row][cell].color = color;
        setAllItems(newArray);
        saveItems();
    }

    const deleteAllColors = () => {
        const newArray: NumberType[][] = allItems.map(row => {
            return row.map(item => {
                return {number: item.number, color: ""}
            });
        });
        setAllItems(newArray);
    }

    const addMyColor = (color: string) => {
        setMyColors([...myColors, color]);
        saveColors([...myColors, color]);
        setShowColor(false);
    }

    const deleteLovedColor = () => {
        setMyColors([]);
        saveColors([]);
    }

    const localKey = "data";
    const localColor = "color";

    const saveItems = () => {
        const valueAsString: string = JSON.stringify(allItems);
        localStorage.setItem(localKey, valueAsString);
    }

    const saveColors = (colorArray: string[]) => {
        const colorString: string = JSON.stringify(colorArray)
        localStorage.setItem(localColor, colorString)
    }

    const loadItems = () => {
        const valueString: string | null = localStorage.getItem(localKey);
        console.log(valueString)
        const value = valueString ? JSON.parse(valueString) : allItems;
        setAllItems(value);
    }

    const loadColors = () => {
        const colorString: string | null = localStorage.getItem(localColor);
        const colorValue = colorString ? JSON.parse(colorString) : [allColors[0], allColors[3]];
        console.log(colorValue);
        setMyColors(colorValue);
    }

    return (
        <div className={"table"}>
            {showColor &&
                <div className={"colorPickerContainer"}>
                    <ColorPicker
                        setActualColor={addMyColor}
                        colors={allColors}
                    />
                </div>
            }

            <div>
            <div className={"colorPicker noprint"}>
                <ColorPicker setActualColor={setChosenColor}
                             colors={myColors}
                />
            </div>
        </div>
            <div className={"buttonRow noprint"}>
                <button onClick={deleteLovedColor}> Palette löschen</button>
                <button onClick={() => setShowColor(true)}> Farbe hinzufügen</button>
            </div>


            <div className={"chosenColor noprint"} style={{
                backgroundColor: "#" + chosenColor,
            }}>&nbsp;</div>

            {allItems
                .map((row, r) => <div
                        key={crypto.randomUUID()}
                        className={"numberTableRow"}
                    > {row.map((numberItem, c) =>
                        <TableOfNumbersSingleBox
                            rowIndex={r}
                            cellIndex={c}
                            numberItem={numberItem}
                            key={numberItem.number}
                            actualColor={chosenColor}
                            setColor={setColor}
                        />
                    )} </div>
                )
            }
            <div className={"buttonRowBottom noprint"}>
                <button
                    className={"deleteButton"}
                    onClick={deleteAllColors}
                > Alle Hintergrundfarben entfernen
                </button>
            </div>
        </div>
    )
}
