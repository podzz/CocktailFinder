/// <reference path="lib/liquidfun.d.ts"/>
/// <reference path="lib/pixi.d.ts"/>
/// <reference path="lib/greensock.d.ts"/>
/// <reference path="lib/three.d.ts"/>
/// <reference path="Graphics.ts"/>
/// <reference path="Tools.ts"/>

class Particle {
    tools:Tools;

    graphics:Graphics;
    events:Events;

    circleArr:THREE.Mesh[] = [];
    circleIndex:number[] = [];

    constructor(graphics, events, tools) {
        this.graphics = graphics;
        this.events = events;
        this.tools = tools;
    }

    public Reset() {
        this.circleArr = [];
        this.circleIndex = [];
    }

    private get_color(color, opacity, tools) {
        if (opacity == null)
            return {
                r: tools.hexToR(color),
                g: tools.hexToG(color),
                b: tools.hexToB(color),
                a: 255
            };
        else
            return {
                r: tools.hexToR(color),
                g: tools.hexToG(color),
                b: tools.hexToB(color),
                a: opacity
            };
    }

    private AddParticleGroup(particleSystem:b2ParticleSystem, spawnPoint, color:any, world:b2World, sphere:THREE.Geometry,
                             graphics:Graphics, circleArr:any[], circleIndex:any[]):void {
        var box:b2PolygonShape = new b2PolygonShape();
        box.SetAsBoxXYCenterAngle(0.5, 0.1, spawnPoint, 0.7);

        var particlegroupDef:b2ParticleGroupDef = new b2ParticleGroupDef();
        particlegroupDef.shape = box;
        particlegroupDef.flags = b2_colorMixingParticle | b2_waterParticle;

        particlegroupDef.color.Set(color.r, color.g, color.b, color.a);

        var bottle:b2BodyDef = new b2BodyDef();
        bottle.type = b2_dynamicBody;
        bottle.position.Set(2, 2);

        var first_record = particleSystem.GetPositionBuffer().length / 2;
        particleSystem.CreateParticleGroup(particlegroupDef);

        world.CreateBody(bottle);
        var second_record = particleSystem.GetPositionBuffer().length / 2;

        for (var i = 0; i < second_record - first_record; i++) {
            var mesh = new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({color: 0xFFFF00}));
            mesh.renderOrder = 2;
            mesh.material.depthTest = false;
            graphics.scene.add(mesh);
            circleArr.push(mesh);
            circleIndex.push(circleArr.length - 1);
        }
    }

    public addFlowBottle(pop, color, opacity, quantity, world:b2World) {
        console.log(pop);
        var locate = this;
        var system:b2ParticleSystem = world.particleSystems[0];
        var sphere = new THREE.SphereGeometry(0.1, 32, 32);
        var spawnPoint:b2Vec2 = new b2Vec2(-2.2, -5);
        var color_process = this.get_color(color, opacity, locate.tools);
        var index_calqueSelected = Math.floor(Math.random() * 11) + 1;
        if (index_calqueSelected == 8)
            index_calqueSelected = 1;
        var baseQuantity = quantity;
        var timeout = setTimeout(function () {
            locate.graphics.RenderRotor('static/physics/img/calque' + index_calqueSelected + '.png', spawnPoint);
            while (quantity > 1) {
                var timeout2 = setTimeout(function () {
                    locate.AddParticleGroup(system, spawnPoint, color_process, world, sphere, locate.graphics, locate.circleArr, locate.circleIndex);
                }, 1000 * (baseQuantity - quantity));
                quantity -= 1;
                locate.events.AddEvent(timeout2);
            }
            locate.events.AddEvent(timeout2);
        }, pop);
        locate.events.AddEvent(timeout);
    }
}