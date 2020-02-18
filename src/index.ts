import {
    Application,
} from "pixi.js";

import { mount, svg } from "redom";
import { makeDraggable } from "./drag";
import { mountBlock } from "./Block";

let app = new Application({
    width: 1920,
    height: 1080,
    antialias: true,
    transparent: false,
    resolution: 1,
});
app.renderer.resize(640, 360);
//mount(<HTMLDivElement>document.getElementById("player"), app.view);

let editor = svg("svg", {
    id: "editor",
    onload: makeDraggable({
        snap(x, y){
            return [Math.round(x/100)*100, Math.round(y/55)*55];
        }
    }),
});

mount(document.body, editor);
mountBlock(<HTMLElement>document.getElementById("editor"));
mountBlock(<HTMLElement>document.getElementById("editor"));