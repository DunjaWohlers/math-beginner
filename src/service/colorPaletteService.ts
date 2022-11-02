import {NumberType} from "../type/NumberType";
import {loadColors, saveColors} from "./localStorageService";

export let myColors:string[] = loadColors();

export const changeBoxColor = (row: number, cell: number, color: string, allItems: NumberType[][]) => {
    const newArray: NumberType[][] = allItems;
    newArray[row][cell].color = color;
    return newArray;
}

export const addMyColor = (color: string) => {
    myColors = [...myColors, color];
    saveColors([...myColors, color]);
}

export const deleteMyColors = () => {
    myColors=[];
    saveColors([]);
}
