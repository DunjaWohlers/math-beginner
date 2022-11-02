import React, {useEffect, useState} from 'react';
import {NumberType} from '../type/NumberType';
import './Home.css';
import Table from "../container/Table";
import {getActualRows, loadItems, saveItems} from "../service/localStorageService";
import {numberArray} from "../service/arrayService";
import {changeBoxColor} from "../service/colorPaletteService";
import ColorPicker from "../container/ColorPicker";

export default function Home() {
    const [allItems, setAllItems] = useState<NumberType[][]>(numberArray(100));
    const [chosenColor, setChosenColor] = useState<string>("");


    useEffect(() => {
            setAllItems(loadItems(allItems));
        }
        , [])

    const [format, setFormat] = useState<boolean>(false);

    const changeBox = (row: number, cell: number, color: string) => {
        const newArray = changeBoxColor(row, cell, color, allItems);
        setAllItems(newArray);
        saveItems(allItems);
    }

    const resetColoring = () => {
        const newArray: NumberType[][] = allItems.map(row => {
            return row.map(item => {
                return {number: item.number, color: ""}
            });
        });
        setAllItems(newArray);
    }

    const handleFormatChange = () => {
        format ? setFormat(false) : setFormat(true);
    }

    const changeMaxNumber = () => {
        let rows: number | undefined = allItems.length ? allItems.length : getActualRows();
        if (rows && (rows > 1)) {
            rows = rows - 1;
        } else {
            rows = 10;
        }
        setAllItems(numberArray(rows));
        saveItems(numberArray(rows));
    }

    return (
        <>
            <button className={"noprint"}
                    onClick={handleFormatChange}>Format ändern
            </button>
            <button className={"noprint"}
                    onClick={changeMaxNumber}>Anzahl reduzieren
            </button>

            <ColorPicker chosenColor={chosenColor} setChosenColor={setChosenColor}/>

            <Table allItems={allItems}
                   chosenColor={chosenColor}
                   setColor={changeBox}
                   format={format}
            />

            <div className={"buttonRowBottom noprint"}>
                <button
                    className={"deleteButton"}
                    onClick={resetColoring}
                > Alle Hintergrundfarben entfernen
                </button>
            </div>
        </>
    )
}
