import { svg } from "redom";

let selected: SVGElement | null;

let transform: SVGTransform, offset = {x: 0, y: 0};

let svgsvg = <SVGSVGElement> svg("svg");

export interface dragOption {
    snap?: Snapper;
}

export const makeDraggable = (opt: dragOption = {}) => (e: Event) => {
    let svg = e.target;
    svg?.addEventListener("mousedown", <any> startDrag);
    svg?.addEventListener("mousemove", <any> drag(opt.snap));
    svg?.addEventListener("mouseup", <any> endDrag);
    //svg.addEventListener("mouseleave", endDrag);
};
const startDrag = (e: MouseEvent) => {
    if((e.target as SVGElement)?.getAttributeNS(null, "draggable") == "true"){
        selected = <SVGElement | null> e.target;
        offset = getMousePosition(e);
        let transforms: any = (<SVGGElement>selected?.parentNode)?.transform.baseVal;
        if(transforms.length == 0 || transforms.getItem(0).type != SVGTransform.SVG_TRANSFORM_TRANSLATE) {
            let translate = svgsvg.createSVGTransform();
            translate.setTranslate(0, 0);

            (<SVGGElement>selected?.parentNode).transform.baseVal.insertItemBefore(translate, 0);
        }
        transform = transforms.getItem(0);
        offset.x -= transform.matrix.e;
        offset.y -= transform.matrix.f;
    }
    
};
type Snapper = (x: number, y: number) => [number, number];
const defaultSnap: Snapper = (x: number, y: number) => [x, y];
const drag = (snap: Snapper = defaultSnap) => (e: MouseEvent) => {
    if(selected){
        e.preventDefault();
        let coord = getMousePosition(e);
        transform.setTranslate(...snap(coord.x - offset.x, coord.y - offset.y));
    }
};
const endDrag = (e: MouseEvent) => {
    if(selected){
        console.log(getMousePosition(e));
        selected = null;
    }
};

function getMousePosition(e: MouseEvent) {
    var CTM = <DOMMatrix> svgsvg.getScreenCTM();
    return {
      x: (e.clientX - CTM.e) / CTM.a,
      y: (e.clientY - CTM.f) / CTM.d,
    };
}