import {NumberType} from "../type/NumberType";
import {getActualRows, loadItems, saveItems} from "./localStorageService";
import {useEffect, useState} from "react";

export default function ArrayService() {

    const [rows, setRows] = useState<number>(10)
    const [allItems, setAllItems] = useState<NumberType[][]>([])

    useEffect(() => {
            loadInitialItems()
        }
        , [rows])

    const loadInitialItems = () => {
        const loadedRows: number = getActualRows();
        console.log(loadedRows)
        let items = loadItems();
        if (items === undefined) {
            items = emptyArray(loadedRows)
        }
        setRows(loadedRows);
        setAllItems(items);
    }

    const emptyArray = (rowNum: number) => {
        let ar: NumberType[][] = new Array(rowNum).fill([]);
        ar = ar.map((row, r) => {
            let rowArray = [];
            for (let i = 0; i < 10; i++) {
                let num = i + 1 + 10 * (r);
                rowArray.push(
                    {number: num, color: ""}
                );
            }
            return rowArray;
        });
        return ar;
    }

    const rowCountdown = () => {
        let rowNum = rows;
        console.log("vorher", rowNum);
        if (rowNum > 1) {
            rowNum--;
            let newItems: NumberType[][] = allItems;
            newItems.pop()
            console.log(newItems);
            saveItems(newItems);
        } else {
            rowNum = 10;
            saveItems(emptyArray(rowNum))
        }
        setRows(rowNum);
        loadInitialItems()
    }

    const resetColoring = () => {
        if (allItems) {
            const newArray: NumberType[][] = allItems.map(row => {
                return row.map(item => {
                    return {number: item.number, color: ""}
                });
            });
            setAllItems(newArray);
        }
    }

    const changeBoxColor = (row: number, cell: number, color: string) => {
        if (allItems) {
            const newArray: NumberType[][] = allItems;
            newArray[row][cell].color = color;
            setAllItems(newArray);
            saveItems(allItems);
        }
    }

    return {resetColoring, allItems, rowCountdown, changeBoxColor}
}


