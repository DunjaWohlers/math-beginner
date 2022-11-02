import React, {useState} from 'react';
import './Home.css';
import Table from "../container/Table";
import ColorPicker from "../container/ColorPicker";
import ArrayService from "../service/ArrayService";

export default function Home() {

    const {
        allItems,
        resetColoring,
        rowCountdown,
        changeBoxColor
    } = ArrayService();

    const [chosenColor, setChosenColor] = useState<string>("");

    const [format, setFormat] = useState<boolean>(false);

    const handleFormatChange = () => {
        format ? setFormat(false) : setFormat(true);
    }

    return (
        <>
            <div className={"buttonRow menu"}>
                <button className={"noprint"}
                        onClick={handleFormatChange}>Format ändern
                </button>
                <button className={"noprint"}
                        onClick={rowCountdown}>Anzahl reduzieren
                </button>
            </div>

            <ColorPicker chosenColor={chosenColor} setChosenColor={setChosenColor}/>

            <Table allItems={allItems}
                   chosenColor={chosenColor}
                   setColor={changeBoxColor}
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
