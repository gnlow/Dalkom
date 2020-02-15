import { svg, mount, setChildren, setAttr } from "redom";

const getBlockPath = (textWidth: number) => {
    return `M 0 0 
    l 5 5 
    v -3 
    a 2 2 90 0 1 2 -2
    h ${textWidth - 2}
    a 5 5 180 0 1 0 10 
    h ${-textWidth + 2} 
    a 2 2 90 0 0 -2 2
    v 4 
    l -5 -5
    z`;
}

let group = <SVGGElement> svg("g", {
    transform: "scale(5)",
});
let block = <SVGPathElement> svg("path", {
    fill: "blue",
});
let text = <SVGTextElement> svg("text", {
    x: 7,
    y: 6.5,
    "font-size": "5px",
});

text.innerHTML = "Hello";

setChildren(group, [block, text]);

mount(<HTMLElement>document.getElementById("editor"), group);

setAttr(block, {
    d: getBlockPath(text.getBBox().width || 40),
});