import {
    Application,
} from "pixi.js";

import { mount, svg } from "redom";
import { makeDraggable } from "./drag";

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
    onload: makeDraggable,
});

mount(document.body, editor);