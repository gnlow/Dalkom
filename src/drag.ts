import { setAttr, svg } from "redom";

let selected: SVGElement | null;

let transform: SVGTransform, offset = {x: 0, y: 0};

let svgsvg = <SVGSVGElement> svg("svg");

export const makeDraggable = (targetInfo: SVGGElement) => {
    let svg = targetInfo;
    console.log(svg);
    svg.addEventListener("mousedown", startDrag);
    svg.addEventListener("mousemove", drag);
    svg.addEventListener("mouseup", endDrag);
    svg.addEventListener("mouseleave", endDrag);
};
const startDrag = (e: MouseEvent) => {
    console.log((<SVGGElement>e.target).parentNode?.children);
    selected = <SVGElement | null> e.target;
    offset = getMousePosition(e);

    let transforms = (<SVGGElement>selected).transform.baseVal;
    if(transforms.length == 0 || transforms.getItem(0) != SVGTransform.SVG_TRANSFORM_TRANSLATE) {
        let translate = svgsvg.createSVGTransform();
        translate.setTranslate(0, 0);

        (<SVGGElement>selected).transform.baseVal.insertItemBefore(translate, 0);
    }
    transform = transforms.getItem(0);
    offset.x -= transform.matrix.e;
    offset.y -= transform.matrix.f;
};
const drag = (e: MouseEvent) => {
    if(selected){
        e.preventDefault();
        let coord = getMousePosition(e);
        transform.setTranslate(coord.x - offset.x, coord.y - offset.y);
    }
};
const endDrag = (e: MouseEvent) => {
    selected = null;
};

function getMousePosition(e: MouseEvent) {
    var CTM = <DOMMatrix> svgsvg.getScreenCTM();
    return {
      x: (e.clientX - CTM.e) / CTM.a / 5,
      y: (e.clientY - CTM.f) / CTM.d / 5,
    };
  }