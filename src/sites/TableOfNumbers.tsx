import React, {useEffect, useState} from 'react';
import {NumberType} from '../type/NumberType';
import ColorPicker from '../components/ColorPicker';
import '../components/tableOfNumbers.css';
import {allColors} from "../functions/allColors";
import Table from "../components/Table";

export default function TableOfNumbers() {
    const [maxNumber, setMaxNumber] = useState<number>(100)
    const numberArray = () => {

        let numberOfRows = maxNumber / 10;
        let ar: NumberType[][] = new Array(numberOfRows).fill([]);

        let rowStart = 0;
        let rowEnd = 10;

        ar = ar.map((row, r) => {
            let rowArray = [];
            rowStart = (maxNumber / numberOfRows) * (r);
            rowEnd = (maxNumber / numberOfRows) * (r + 1);
            for (let i = rowStart; i < rowEnd; i++) {
                rowArray.push(
                    {number: i + 1, color: ""}
                );
            }
            return rowArray;
        });
        return ar;
    }

    const [allItems, setAllItems] = useState<NumberType[][]>(numberArray());

    const loadItems = () => {
        const valueString: string | null = localStorage.getItem(localKey);
        const value = valueString ? JSON.parse(valueString) : allItems;
        setAllItems(value);
    }

    useEffect(() => {
            loadColors();
            loadItems();
        }
        , [maxNumber])

    const [myColors, setMyColors] = useState<string[]>([]);
    const [format, setFormat] = useState<boolean>(false);

    const [showColor, setShowColor] = useState<boolean>(false)

    const [chosenColor, setChosenColor] = useState<string>("");

    const setColor = (row: number, cell: number, color: string) => {
        const newArray: NumberType[][] = allItems;
        newArray[row][cell].color = color;
        setAllItems(newArray);
        saveItems(allItems);
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

    const saveItems = (items: NumberType[][]) => {
        const valueAsString: string = JSON.stringify(items);
        localStorage.setItem(localKey, valueAsString);
    }

    const saveColors = (colorArray: string[]) => {
        const colorString: string = JSON.stringify(colorArray)
        localStorage.setItem(localColor, colorString)
    }



    const loadColors = () => {
        const colorString: string | null = localStorage.getItem(localColor);
        const colorValue = colorString ? JSON.parse(colorString) : [allColors[0], allColors[3]];
        setMyColors(colorValue);
    }

    const handleFormatChange = () => {
        format ? setFormat(false) : setFormat(true);
    }

    const changeMaxNumber = () => {
        if (maxNumber > 10) {
            setMaxNumber(maxNumber - 10);
        }else if(maxNumber<=10){
            setMaxNumber(100);
        }
        setAllItems(numberArray());
        saveItems(numberArray());
    }

    return (
        <>
            <button className={"noprint"}
                    onClick={handleFormatChange}>Format ändern
            </button>
            <button className={"noprint"}
                    onClick={changeMaxNumber}>Anzahl reduzieren
            </button>

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
            }}>
                &nbsp;
            </div>
            <Table allItems={allItems}
                   chosenColor={chosenColor}
                   setColor={setColor}
                   format={format}
            />

            <div className={"buttonRowBottom noprint"}>
                <button
                    className={"deleteButton"}
                    onClick={deleteAllColors}
                > Alle Hintergrundfarben entfernen
                </button>
            </div>
        </>
    )
}
