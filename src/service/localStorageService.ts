import {NumberType} from "../type/NumberType";
import {allColors} from "../staticfunctions/allColors";

const localKey: string = "data";
const localColor: string = "color";

export const saveItems = (items: NumberType[][]) => {
    const valueAsString: string = JSON.stringify(items);
    localStorage.setItem(localKey, valueAsString);
}

export const saveColors = (colorArray: string[]) => {
    const colorString: string = JSON.stringify(colorArray)
    localStorage.setItem(localColor, colorString)
}

export const loadItems = (allItems: NumberType[][]) => {
    const valueString: string | null = localStorage.getItem(localKey);
    return valueString ? JSON.parse(valueString) : allItems;
}

export const loadColors = () => {
    const colorString: string | null = localStorage.getItem(localColor);
    return colorString ? JSON.parse(colorString) : [allColors[0], allColors[3]];
}

export const getActualRows = () => {
    const valueString: string | null = localStorage.getItem(localKey);
    if(valueString){
        return JSON.parse(valueString).lenght;
    }else{
        return 10;
    }
}



