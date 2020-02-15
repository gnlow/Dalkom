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

const SVG = "http://www.w3.org/2000/svg";

let group = document.createElementNS(SVG, "g");
let block = document.createElementNS(SVG, "path");
let text = document.createElementNS(SVG, "text");

group.setAttributeNS(null, "transform", "scale(5)")

block.setAttributeNS(null, "fill", "blue");

text.innerHTML = "Hello";
text.setAttributeNS(null, "x", "7");
text.setAttributeNS(null, "y", "6.5");
text.setAttributeNS(null, "font-size", "5px");

group.appendChild(block);
group.appendChild(text);

document.getElementById("editor")?.appendChild(group);

block.setAttributeNS(null, "d", getBlockPath(text.getBBox().width || 40));
