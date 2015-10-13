/**
 * Created by Francois on 07/10/15.
 */
/// <reference path="lib/pixi.d.ts"/>
/// <reference path="lib/jquery.d.ts"/>
/// <reference path="Timeline.ts"/>
/// <reference path="Filters.ts"/>
class Graphics {
    stage:PIXI.Container;
    particleStage:PIXI.Container;
    renderers:PIXI.CanvasRenderer | PIXI.WebGLRenderer;

    public width:number;
    public height:number;

    private timeline:Timeline;

    constructor(width:number, height:number, timeline:Timeline) {
        this.width = width;
        this.height = height;

        this.timeline = timeline;
        this.renderers = PIXI.autoDetectRenderer(this.width, this.height, {transparent: true}, false);  // arguments: width, height, view, transparent, disableWebGL
    }

    appendRenderer() {
        $("#renderer").append(this.renderers.view);
    }

    loadRenderer() {
        this.timeline.resetTimeline();
        this.stage.destroy(true);
        this.particleStage.destroy(true);

        var blur:PIXI.filters.BlurFilter = new PIXI.filters.BlurFilter();
        var filters:Filters = new Filters();
        var threshold:PIXI.AbstractFilter = filters.getThresoldFilter();

        blur.blur = 5;
        blur.passes = 2;

        this.stage = new PIXI.Container();
        this.particleStage = new PIXI.Container();
        this.particleStage.filters = [blur, threshold];
        this.stage.addChild(this.particleStage);
    }


    renderRecipe(image_url) {
        var bottle:PIXI.Sprite = PIXI.Sprite.fromImage(image_url);
        bottle.alpha = 0.9;
        bottle.interactive = true;
        bottle.width = 500
        bottle.height = 800;

        bottle.anchor.x = 0.5;
        bottle.x = this.width / 2;
        bottle.y = 30;
        //recipeArr.push(bottle);
        this.stage.addChild(bottle);
    }
}