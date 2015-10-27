/// <reference path="lib/pixi.d.ts"/>
/// <reference path="lib/jquery.d.ts"/>
/// <reference path="Events.ts"/>
/// <reference path="Filters.ts"/>
/// <reference path="Tools.ts"/>

class Graphics {
    stage:PIXI.Container;
    particleStage:PIXI.Container;
    renderers:PIXI.CanvasRenderer | PIXI.WebGLRenderer;

    private events:Events;
    private sprites:any=[];

    private blur:PIXI.filters.BlurFilter;

    constructor(events:Events) {

        this.events = events;
        this.renderers = PIXI.autoDetectRenderer($("#renderer").width(), $("#renderer").height(), {transparent: true}, false);  // arguments: width, height, view, transparent, disableWebGL

        this.blur = new PIXI.filters.BlurFilter();
        this.blur.blur = 0;

        this.renderers.view.id = "viewer";
        $("#renderer").append(this.renderers.view);
    }

    LoadRenderer() {
        if (this.stage != null && this.particleStage != null) {
            this.stage.destroy(false);
            this.particleStage.destroy(false);
        }

        var filters:Filters = new Filters();
        //var threshold:PIXI.AbstractFilter = filters.getThresoldFilter();

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
        var sprite = this.sprites[image_url];
        if (sprite == null) {
            var bottle:PIXI.Sprite = PIXI.Sprite.fromImage(image_url);
            bottle.alpha = 0.9;
            bottle.interactive = true;
            bottle.width = 200;
            bottle.height = 300;

            bottle.x = Tools.GetWidth() / 2 - bottle.width / 2;
            bottle.y = Tools.GetHeight() - bottle.height - 200;
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