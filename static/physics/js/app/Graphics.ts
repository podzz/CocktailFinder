/// <reference path="lib/pixi.d.ts"/>
/// <reference path="lib/jquery.d.ts"/>
/// <reference path="Events.ts"/>
/// <reference path="Filters.ts"/>

class Graphics {
    stage:PIXI.Container;
    particleStage:PIXI.Container;
    renderers:PIXI.CanvasRenderer | PIXI.WebGLRenderer;

    public width:number;
    public height:number;

    public innerWidth:number;
    public innerHeight:number;

    private events:Events;
    private sprites:any={};

    private blur:PIXI.filters.BlurFilter;

    constructor(width:number, height:number, events:Events) {
        this.width = width;
        this.height = height;

        this.events = events;
        this.renderers = PIXI.autoDetectRenderer(this.width, this.height, {transparent: true}, false);  // arguments: width, height, view, transparent, disableWebGL

        this.blur = new PIXI.filters.BlurFilter();
        this.blur.blur = 0;

        this.innerWidth = window.innerWidth;
        this.innerHeight = window.innerHeight;
        $("#renderer").append(this.renderers.view);

        var ref = this;
        window.addEventListener('resize', function() {
            console.log(10 / (window.innerWidth - ref.innerWidth));
            if (ref.innerWidth < window.innerWidth)
                ref.stage.scale.x += (window.innerWidth - ref.innerWidth) / 3000;
            else if (ref.innerWidth > window.innerWidth)
                ref.stage.scale.x -= (ref.innerWidth - window.innerWidth) / 3000;

            if (ref.innerHeight < window.innerHeight)
                ref.stage.scale.y += (window.innerHeight - ref.innerHeight) / 1000;
            else if (ref.innerHeight > window.innerHeight)
                ref.stage.scale.y -= (ref.innerHeight - window.innerHeight) / 1000;

            ref.innerWidth = window.innerWidth;
            ref.innerHeight = window.innerHeight;
            }, false);
    }

    LoadRenderer() {
        if (this.stage != null && this.particleStage != null) {
            this.stage.destroy(false);
            this.particleStage.destroy(false);
        }

        var filters:Filters = new Filters();
        var threshold:PIXI.AbstractFilter = filters.getThresoldFilter();

        this.stage = new PIXI.Container();
        this.particleStage = new PIXI.Container();
        this.particleStage.filters = [this.GetBlur()];
        this.stage.addChild(this.particleStage);
    }

    ResizeCanvas()
    {

    //.scale(0.1,0.1);
        //this.renderers.view.getContext('2d').scale(0.5,0.5);
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
            bottle.y = this.height - bottle.height - 200;
            this.sprites[image_url] = bottle;
        }
    }

    public DrawDebugBottle()
    {
        var graphics:PIXI.Graphics = new PIXI.Graphics();
        graphics.beginFill(0xFF0000);

        graphics.moveTo(0,10);
        graphics.lineTo(0, 500);
        this.stage.addChild(graphics);
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