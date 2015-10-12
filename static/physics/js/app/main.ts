/// <reference path="../lib/liquidfun.d.ts"/>
/// <reference path="../lib/pixi.d.ts"/>
/// <reference path="Shape.ts"/>
/// <reference path="Filters.ts"/>
/// <reference path="Graphics.ts"/>
/// <reference path="Animation.ts"/>


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

    currentRecipe: number =  0;
    currentIngredients: any;


    // BOX2D World
    world:b2World;

    // Dictionary Managers
    managers:{ [id: string] : any }

    constructor(width:number, height:number, METER:number) {
        this.width = width;
        this.height = height;
        this.METER = METER;
        this.world = new b2World(new b2Vec2(0, 10));

        //INIT MANAGERS
        this.managers['timeline'] = new Timeline();
        this.managers['graphics'] = new Graphics(width, height, this.managers['timeline']);
        this.managers['shape'] = new Shape(width, height, METER);
        this.managers['animation'] = new Animation(width, height, METER);

        this.managers['parser'].initParser();

    }

    public InitDisplay() {
        this.managers['graphics'].appendRenderer();
        this.world.CreateBody(new b2BodyDef);
        requestAnimationFrame(this.managers['animation'].animate);
    }

    public LoadDisplay(ingredients: any, recipe_id: number) {
        var graphics:Graphics = this.managers['graphics'];
        graphics.loadRenderer();
        this.world.DestroyParticleSystem(this.world.particleSystems[0]);

        this.currentRecipe = recipe_id;
        this.currentIngredients = ingredients;
        this.LoadAnimation("AnimationManager");
    }

    public LoadAnimation(animationName) {
        var bd = new b2BodyDef();
        this.world.CreateBody(bd);
        // LOAD ANIMATION
    }
}

/*
circleIndex = [];
recipeArr = [];
edgeArr = [];
shapeArr = [];
circleArr = [];
rotorArr = [];
soundArray = [];
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