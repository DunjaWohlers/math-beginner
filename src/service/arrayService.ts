import {NumberType} from "../type/NumberType";

export const numberArray = (rows: number) => {

    let ar: NumberType[][] = new Array(rows).fill([]);
    ar = ar.map((row, r) => {
        let rowArray = [];
        for (let i = 0; i < 10; i++) {
            let num = i+1+10*(r);
            rowArray.push(
                {number: num, color: ""}
            );
        }
        return rowArray;
    });
    return ar;
}
