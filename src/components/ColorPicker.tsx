import "./colorPicker.css";

export default function ColorPicker(
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
