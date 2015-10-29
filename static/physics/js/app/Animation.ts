/// <reference path="lib/liquidfun.d.ts"/>
/// <reference path="lib/pixi.d.ts"/>
/// <reference path="Parser.ts"/>
/// <reference path="Collision.ts"/>
/// <reference path="Graphics.ts"/>
/// <reference path="Recipe.ts"/>
/// <reference path="Particle.ts"/>
/// <reference path="Tools.ts"/>

class AnimationCocktail {
    public world:b2World;
    private parser:Parser;
    private collision:Collision;
    private graphics:Graphics;
    private recipe:Recipe;
    public particle:Particle;
    private tools:Tools;
    private events:Events;

    private time:number = 0;

    constructor(managers:any) {
        this.world = new b2World(new b2Vec2(0, 10));

        this.parser = managers['parser'];
        this.collision = managers['collision'];
        this.graphics = managers['graphics'];
        this.recipe = managers['recipe'];
        this.events = managers['events'];
        this.tools = managers['tools'];
        this.particle = new Particle(this.graphics, this.events, this.tools);
    }

    private WorldReset() {
        this.events.resetTimeline();
        this.time = 0;
        while (this.world.particleSystems.length > 0) {
            this.world.DestroyParticleSystem(this.world.particleSystems[0]);
        }
        while (this.world.bodies.length > 0) {
            this.world.DestroyBody(this.world.bodies[0]);
        }

        this.graphics.scene = new THREE.Scene();
        this.graphics.scene.add(this.graphics.camera);


        var psd = new b2ParticleSystemDef();
        psd.radius = 0.05;
        psd.dampingStrength = 0.4;
        psd.viscousStrength = 0.05;
        //psd.colorMixingStrength = 0.8;
        psd.colorMixingStrength = 0.009;
        this.world.CreateParticleSystem(psd);
        this.particle.Reset();
    }

    public Load(ingredients:any, recipe_id:number, reload:boolean) {
        this.WorldReset();
        var bdDef:b2BodyDef = new b2BodyDef();
        var body:b2Body = this.world.CreateBody(bdDef);

        //var bdDefRotor:b2BodyDef = new b2BodyDef();
        //var bodyRotor:b2Body = this.world.CreateBody(bdDefRotor);

        var rotorDef:b2BodyDef = new b2BodyDef();
        var rotorBody:b2Body = this.world.CreateBody(rotorDef);

        var recipe:number = ((recipe_id == 0) ? Math.floor(Math.random() * 12) + 1 : recipe_id);

        this.collision.LinkShape(body, this.parser.getRecipe(recipe), this.world);
        //this.collision.LinkShape(bodyRotor, this.parser.getRotor(), this.world);
        this.collision.LinkRotor(rotorBody, this.world);

        this.graphics.RenderRecipe(this.parser.getRecipeImagePath(recipe_id));

        var distributions = this.recipe.generateDistribution(ingredients);
        for (var i = 0; i < distributions.length; i++) {
            var distribution = distributions[i];
            this.particle.addFlowBottle(distribution.pop, distribution.color, distribution.opacity, distribution.quantity, this.world);
        }
        if (!reload)
            requestAnimationFrame(this.animate.bind(this));
    }

    private step() {
        var timeStep:number = 1.0 / 60.0;
        this.world.Step(timeStep, 3, 3);
        this.time += 1 / 60;
    }

    public animate() {
        this.step();
        var system = this.world.particleSystems[0];

        var particles = system.GetPositionBuffer();
        var color = system.GetColorBuffer();

        var dropable_index = [];
        for (var key in this.particle.circleIndex) {
            var index = this.particle.circleIndex[key];
            var circle = this.particle.circleArr[index];
            if (circle.position.y < 10) {
                circle.position.x = particles[index * 2];
                circle.position.y = particles[(index * 2) + 1];
                circle.material.setValues({
                    color: parseInt(this.tools.rgbToHex(
                        color[index * 4],
                        color[(index * 4) + 1],
                        color[(index * 4) + 2]), 16), opacity: color[(index * 4) + 3] / 255
                });
            }
            else {
                dropable_index.push(this.particle.circleIndex[key]);
            }
        }

        if (dropable_index.length > 0) {
            for (var key in dropable_index) {
                var index = this.particle.circleIndex.indexOf(dropable_index[key]);
                if (index > -1) {
                    this.particle.circleIndex.splice(index, 1);
                }
            }
        }
        this.graphics.threeRenderer.render(this.graphics.scene, this.graphics.camera);
        requestAnimationFrame(this.animate.bind(this));
    }
}