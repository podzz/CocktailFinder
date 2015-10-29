/// <reference path="lib/liquidfun.d.ts"/>
/// <reference path="lib/pixi.d.ts"/>
/// <reference path="Events.ts"/>
/// <reference path="Recipe.ts"/>
/// <reference path="Shape.ts"/>
/// <reference path="Graphics.ts"/>
/// <reference path="Animation.ts"/>
/// <reference path="Tools.ts"/>

class Main {
    METER:number = 100;

    currentRecipe: number =  0;
    currentIngredients: any;

    // Dictionary Managers
    managers:any = {};

    constructor() {

        //INIT MANAGERS
        this.managers['events'] = new Events();
        this.managers['recipe'] = new Recipe();
        this.managers['graphics'] = new Graphics(this.managers['events']);
        this.managers['shape'] = new Shape();
        this.managers['tools'] = new Tools();
        this.managers['parser'] = new Parser();
        this.managers['collision'] = new Collision();
        this.managers['animation'] = new AnimationCocktail(this.managers);

        this.InitResize();
    }

    private InitResize()
    {
        var ref = this;
        window.addEventListener('resize', function() {
            var graphics:Graphics = ref.managers['graphics'];
            graphics.threeRenderer.setSize(Tools.GetWidth(), Tools.GetHeight());
            graphics.camera.aspect = Tools.GetWidth() / Tools.GetHeight();
            graphics.camera.updateProjectionMatrix();
        });
    }

    public Load(ingredients: any, recipe_id: number, reload:boolean) {
        this.currentRecipe = recipe_id;
        this.currentIngredients = ingredients;

        var graphics:Graphics = this.managers['graphics'];

        var animation:AnimationCocktail = this.managers['animation'];
        animation.Load(ingredients, recipe_id, reload);
    }
}
export=Main