import {loadColors, saveColors} from "./localStorageService";

export let myColors: string[] = loadColors();

export const addMyColor = (color: string) => {
    myColors = [...myColors, color];
    saveColors([...myColors, color]);
}

export const deleteMyColors = () => {
    myColors = [];
    saveColors([]);
}
