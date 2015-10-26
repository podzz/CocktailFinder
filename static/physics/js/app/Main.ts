/// <reference path="lib/liquidfun.d.ts"/>
/// <reference path="lib/pixi.d.ts"/>
/// <reference path="Events.ts"/>
/// <reference path="Recipe.ts"/>
/// <reference path="Shape.ts"/>
/// <reference path="Graphics.ts"/>
/// <reference path="Animation.ts"/>
/// <reference path="Tools.ts"/>

class Main {
    width:number = 0;
    height:number = 0;
    METER:number = 0;

    currentRecipe: number =  0;
    currentIngredients: any;

    // Dictionary Managers
    managers:any = {};

    constructor(width:number, height:number, METER:number) {
        this.width = width;
        this.height = height;
        this.METER = METER;

        //INIT MANAGERS
        this.managers['events'] = new Events();
        this.managers['recipe'] = new Recipe();
        this.managers['graphics'] = new Graphics(width, height, this.managers['events']);
        this.managers['shape'] = new Shape(width, height, METER);
        this.managers['tools'] = new Tools();
        this.managers['parser'] = new Parser(width, height, METER);
        this.managers['collision'] = new Collision();
        this.managers['animation'] = new AnimationCocktail(this.width, this.height, this.METER, this.managers);
    }

    /*
    public InitDisplay() {
        //this.world.CreateBody(new b2BodyDef);
        //requestAnimationFrame(this.managers['animation'].animate);
    }*/

    public Load(ingredients: any, recipe_id: number) {
        this.currentRecipe = recipe_id;
        this.currentIngredients = ingredients;

        var graphics:Graphics = this.managers['graphics'];
        graphics.LoadRenderer();

        var animation:AnimationCocktail = this.managers['animation'];
        animation.Load(ingredients, recipe_id);
    }
}


//manager.parser = new Parser();
//manager.collisionManager = new CollisionManager();
//manager.shapeManager = new ShapeManager();
//manager.animationManager = AnimationManager();

//$("#renderer").append(renderers.view);

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
export=Main