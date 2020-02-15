import {
    Application,
} from "pixi.js";

let app = new Application({
    width: 1920,
    height: 1080,
    antialias: true,
    transparent: false,
    resolution: 1,
});
app.renderer.resize(640, 360);
document.body.appendChild(app.view);