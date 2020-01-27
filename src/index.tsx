import React, {useRef, useState, useEffect} from "react";
import ReactDOM from "react-dom";

function Block(props : {
    content: React.ReactNode;
    color?: string;
}) {
    const textRef = useRef < SVGTextElement > (null);
    const [textWidth,
        setTextWidth] = useState(40);
    useEffect(() => {
        setTextWidth(textRef.current
            ?.getBBox().width || 40);
    });
    const text = <text
        x="7"
        y="6.5"
        style={{
        fontSize: "5px",
        fill: "white",
    }}
        ref={textRef}>
        {props.content}
    </text>;
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
    return <g transform="translate(200, 100) scale(5)">
        <path d={blockPath} fill={props.color}/> {text}
    </g>;

}
var element = <Block content="콘솔에 (text) 찍기" color="#7a00b7" />;
ReactDOM.render(element, document.getElementById("editor"));