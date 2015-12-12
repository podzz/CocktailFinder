/// <reference path="lib/liquidfun.d.ts"/>
/// <reference path="lib/pixi.d.ts"/>
/// <reference path="Events.ts"/>
/// <reference path="Recipe.ts"/>
/// <reference path="Graphics.ts"/>
/// <reference path="Animation.ts"/>
/// <reference path="Tools.ts"/>

class Main {
    currentRecipe:number = 0;
    currentIngredients:any;

    // Dictionary Managers
    managers:any = {};

    constructor() {

        //INIT MANAGER
        this.managers['events'] = new Events();
        this.managers['recipe'] = new Recipe();
        this.managers['graphics'] = new Graphics(this.managers['events']);
        this.managers['tools'] = new Tools();
        this.managers['parser'] = new Parser();
        this.managers['collision'] = new Collision();
        this.managers['animation'] = new AnimationCocktail(this.managers);

        this.InitCallbacks();
    }

    private InitCallbacks() {
        var ref = this;

        var mouseDown = false;
        window.addEventListener('resize', function () {
            var graphics:Graphics = ref.managers['graphics'];
            graphics.threeRenderer.setSize(Tools.GetWidth(), Tools.GetHeight());
            graphics.camera.aspect = Tools.GetWidth() / Tools.GetHeight();
            graphics.camera.updateProjectionMatrix();
        });

        window.addEventListener('mousedown', function (event) {
            mouseDown = true;
            var p = ref.GetMouseCoords(event, ref.managers['graphics']);
            var particle:Particle = ref.managers['animation'].particle;
            particle.addIceCube(p.x, p.y , 0.35, ref.managers['animation'].world);
        });

        window.addEventListener('mousemove', function (event) {
            if (mouseDown) {
                 mouseDown = false;
            }
        });

        window.addEventListener('mouseup', function(event) {
           mouseDown = false;
        });
    }

    private GetMouseCoords(event, graphics:Graphics):THREE.Vector3 {
        var vector = new THREE.Vector3();
        vector.set((event.clientX / Tools.GetWidth()) * 2 - 1,
            -(event.clientY / Tools.GetHeight()) * 2 + 1,
            0.5);
        vector.unproject(graphics.camera);
        return vector;
    }

    public Load(ingredients:any, recipe_id:number, reload:boolean) {
        this.currentRecipe = recipe_id;
        this.currentIngredients = ingredients;
        this.managers['animation'].Load(ingredients, recipe_id, reload);
    }
}
export=Main