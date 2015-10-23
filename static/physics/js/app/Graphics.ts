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
    private sprites:any={};

    private blur:PIXI.filters.BlurFilter;

    constructor(width:number, height:number, timeline:Timeline) {
        this.width = width;
        this.height = height;

        this.timeline = timeline;
        this.renderers = PIXI.autoDetectRenderer(this.width, this.height, {transparent: true}, false);  // arguments: width, height, view, transparent, disableWebGL

        this.blur = new PIXI.filters.BlurFilter();
        this.blur.blur = 5;
        this.blur.passes = 2;

        $("#renderer").append(this.renderers.view);
    }

    LoadRenderer() {
        if (this.stage != null && this.particleStage != null) {
            this.stage.destroy(false);
        }

        var filters:Filters = new Filters();
        var threshold:PIXI.AbstractFilter = filters.getThresoldFilter();

        this.stage = new PIXI.Container();
        this.particleStage = new PIXI.Container();
        this.particleStage.filters = [this.GetBlur()];
        this.stage.addChild(this.particleStage);
    }

    RenderRecipe(image_url) {
        this.LoadSprite(image_url);
        var bottle:PIXI.Sprite = this.sprites[image_url];
        //recipeArr.push(bottle);
        this.stage.addChild(bottle);
    }

    // Used to load sprite once
    private LoadSprite(image_url) {
        if (this.sprites[image_url] == null) {
            var bottle:PIXI.Sprite = PIXI.Sprite.fromImage(image_url);
            bottle.alpha = 0.9;
            bottle.interactive = true;
            bottle.width = 200;
            bottle.height = 300;

            bottle.x = this.width / 2 - bottle.width / 2;
            bottle.y = this.height - bottle.height - 100;
            this.sprites[image_url] = bottle;
        }
    }

    public GetBlur():PIXI.filters.BlurFilter {
        return this.blur;
    }

    public GetParticleStage():PIXI.Container {
        return this.particleStage;
    }

    public GetStage():PIXI.Container {
        return this.stage;
    }

    public GetRenderers():PIXI.CanvasRenderer | PIXI.WebGLRenderer {
        return this.renderers;
    }
}