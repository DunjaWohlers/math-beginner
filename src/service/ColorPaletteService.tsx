import {loadColors, saveColors} from "./localStorageService";
import {useState} from "react";

export default function ColorPaletteService(){
    const [myColors, setMyColors] = useState<string[]>(loadColors());

    const addMyColor = (color: string) => {
        setMyColors( [...myColors, color]);
        saveColors([...myColors, color]);
    }

    const deleteMyColors = () => {
        setMyColors([]);
        saveColors([]);
    }

    return {myColors, addMyColor, deleteMyColors};
}
