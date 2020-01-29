import React, {useRef, useState, useEffect} from "react";
import ReactDOM from "react-dom";
import {useDrag, DndProvider} from "react-dnd";
import Backend from "react-dnd-html5-backend";

const Label = React.forwardRef((props : {
    content: string;
}, ref) => {
    const texts = props
        .content
        .split(/[({<)}>]/)
        .map((text, index) => {
            return <tspan>
                {text}
            </tspan>;
        });
    return <text {...props} ref={ref}>
        {texts}
    </text>;
});

function Block(props : {
    content: string;
    color?: string;
}) {
    const textRef = useRef < SVGTextElement > (null);
    const [textWidth,
        setTextWidth] = useState(40);
    useEffect(() => {
        setTextWidth(textRef.current
            ?.getBBox().width || 40);
    });
    const text = <Label
        x="7"
        y="6.5"
        style={{
        fontSize: "5px",
        fill: "white"
    }}
        ref={textRef}
        content={props.content}></Label>;

    const [
        {
            isDragging
        },
        drag] = useDrag({
        item: {
            type: "block"
        },
        collect: monitor => ({
            isDragging: !!monitor.isDragging()
        })
    });
    const blockPath = `M 0 0 
        l 5 5 
        v -3 
        a 2 2 90 0 1 2 -2
        h ${textWidth - 2}
        a 5 5 180 0 1 0 10 
        h ${ - textWidth + 2} 
        a 2 2 90 0 0 -2 2
        v 4 
        l -5 -5
        z`;
    return <g
        transform="translate(200, 100) scale(5)"
        ref={drag}
        style={{
        opacity: isDragging
            ? 0.5
            : 1,
        cursor: 'move'
    }}>
        <path d={blockPath} fill={props.color}/> {text}
    </g>;
}
var element = <DndProvider backend={Backend}>
    <svg>
        <Block content="콘솔에 (text) 찍기" color="#7a00b7"/>
    </svg>
</DndProvider>;
ReactDOM.render(element, document.getElementById("app"));