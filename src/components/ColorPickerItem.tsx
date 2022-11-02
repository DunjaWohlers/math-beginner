import "../container/colorPicker.css";

export default function ColorPickerItem(
    props: {
        setActualColor: (color: string) => void,
        colors: string[],
    }) {

    const handleClick = (col: string) => {
        props.setActualColor(col);
    }

    return (
        <>
            {props.colors.map(color =>
                <button
                    onClick={() => handleClick(color)}
                    className={"colorField"}
                    style={{backgroundColor: "#" + color}}
                    key={color}>
                    &nbsp;
                </button>)}
        </>
    )
}
