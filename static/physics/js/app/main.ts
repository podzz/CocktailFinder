/// <reference path="../lib/liquidfun.d.ts"/>
/// <reference path="managerShape.ts"/>



//manager.parser = new Parser();
//manager.collisionManager = new CollisionManager();
//manager.shapeManager = new ShapeManager();
//manager.animationManager = AnimationManager();

//$("#renderer").append(renderers.view);

class Main {
    width:number = 0;
    height:number = 0;
    METER:number = 0;
    stage:any;
    renderers:any;
    particleStage:any;

    // BOX2D World
    world:any;

    // Dictionary Managers
    managers: { [id: string] : any }

    constructor(width:number, height:number, METER:number) {
        this.width = width;
        this.height = height;
        this.METER = METER;
        this.world = new b2World(new b2Vec2(0, 10));

        //INIT MANAGERS
        this.managers['parser'].initParser();

    }

    public InitManagers() {
        this.managers = new ManagerShape(this.width, this.height, this.METER);
    }

    public InitDisplay(blurX: number, passes: number) {
        this.stage = new PIXI.Container();
        this.particleStage = new PIXI.Container();
        this.stage.addChild(this.particleStage);

        var blur:any = new PIXI.filters.BlurFilter();
        blur.blurX = blurX;
        blur.passes = passes;

        this.renderers = PIXI.autoDetectRenderer(this.width, this.height, {transparent: true}, false);  // arguments: width, height, view, transparent, disableWebGL

        this.world.SetGravity(new b2Vec2(0, 10));
        var bd = new b2BodyDef;
        var g_groundBody = this.world.CreateBody(bd);

        requestAnimationFrame(this.managers['animation'].animate);
    }


    private Reload(ingredients, recipe_id) {
        resetTimeline();

        delete stage;
        delete particleStage;

        blur = new PIXI.filters.BlurFilter();
        thresold = new PIXI.TresholdFilter();

        blur.blur = 5;
        blur.passes = 2;

        stage = new PIXI.Container();
        particleStage = new PIXI.Container();
        particleStage.filters = [blur, thresold];
        stage.addChild(particleStage);


        world.DestroyParticleSystem(world.particleSystems[0]);
    }
}
    /* Create World */
/*
    gravity = new b2Vec2(0, 8);
    world = new b2World(gravity);

    circleIndex = [];
    recipeArr = [];
    edgeArr = [];
    shapeArr = [];
    circleArr = [];
    rotorArr = [];
    soundArray = [];


    if (recipe_id != null)
        currentRecipe = recipe_id;
    else
        currentRecipe = null;
    currentIngredients = ingredients;
    this.LoadAnimation("AnimationManager");
}



CocktailRenderer.prototype.LoadAnimation = function (animationName) {
    var bd = new this.liquidfun.b2BodyDef();
    g_groundBody = world.CreateBody(bd);

    var animationManager = new window[animationName];
}
*/
/*
 var circleArr = [];
 var circleIndex = [];
 var shapeArr = [];
 var edgeArr = [];
 var recipeArr = [];
 var rotorArr = [];
 var objectDisplayArr = [];
 var objectPhysicsArr = [];
 var soundMute = false;
 var soundArray = [];
 var soundAmbiant = null;

 var currentIngredients = null;
 var currentRecipe = null;
 var rotorBodyWidth = 0;
 var rotorBodyHeight = 0;

 var objectArrInc = 0;

 var right;
 var left;
 var timeStep = 1.0 / 60.0;
 var particleSystem;
 var velocityIterations = 3;
 var positionIterations = 3;
 var g_groundBody = null;
 var test;

 var particleSize = 10;

 var world = null;
 var parser = null;
 var collisionManager = null;
 var animationManager = null;
 var shapeManager = null;

 var stage = null;
 var particleStage = null;
 var renderers = null;

 var custom = null;
 */