import ColorPickerItem from "../components/ColorPickerItem";
import {allColors} from "../staticfunctions/allColors";
import {addMyColor, deleteMyColors, myColors} from "../service/colorPaletteService";
import React, {useState} from "react";

export default function ColorPicker(
    props:{
        chosenColor:string,
        setChosenColor : (col:string) => void,
    }
){
    const [showColor, setShowColor] = useState<boolean>(false)
    const addToActualColors = (col:string) => {
        addMyColor(col)
        setShowColor(false);
    }

    return(
        <>
            {showColor &&
                <div className={"colorPickerContainer"}>
                    <ColorPickerItem
                        setActualColor={addToActualColors}
                        colors={allColors}
                    />
                </div>
            }
            <div>
                <div className={"colorPicker noprint"}>
                    <ColorPickerItem setActualColor={props.setChosenColor}
                                     colors={myColors}
                    />
                </div>
            </div>
            <div className={"buttonRow noprint"}>
                <button onClick={deleteMyColors}> Palette löschen</button>
                <button onClick={() => setShowColor(true)}> Farbe hinzufügen</button>
            </div>
            <div className={"chosenColor noprint"} style={{
                backgroundColor: "#" + props.chosenColor,
            }}>
                &nbsp;
            </div>
        </>
    )
}