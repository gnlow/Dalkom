import { svg, mount, setChildren, setAttr, RedomElement, text } from "redom";

const getBlockPath = (textWidth: number = 40) => {
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
};
const correctWidth = (block: SVGPathElement, text: SVGTextElement) => {
    setAttr(block, {
        d: getBlockPath(text.getBBox().width || 40),
    });
};
export const mountBlock = (parent: RedomElement) => {
    let group = <SVGGElement> svg("g", {
        transform: "scale(5)",
    });
    let block = <SVGPathElement> svg("path", {
        fill: "skyblue",
        draggable: true,
    });
    let innerText = <SVGTextElement> svg("text", {
        x: 7,
        y: 6.5,
        "font-size": "5px",
        draggable: true,
    });
    "(글) 쓰기".split(/[({<)}>]/).forEach((str, i) => {
        if(i % 2){
            mount(innerText, svg("tspan", {
                x: 7,
                y: 6.5,
                "font-size": "5px",
            }, str));
        }else if(str){
            mount(innerText, text(str));
        }
    })

    setChildren(group, [block, innerText]);

    mount(parent, group);

    correctWidth(block, innerText)
};