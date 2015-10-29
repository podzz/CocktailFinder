/// <reference path="lib/liquidfun.d.ts"/>
/// <reference path="lib/pixi.d.ts"/>
/// <reference path="lib/greensock.d.ts"/>
/// <reference path="lib/three.d.ts"/>
/// <reference path="Graphics.ts"/>
/// <reference path="Tools.ts"/>

class Particle {
    METER:number = 100;
    glassScale:number = 1.9;

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

    public addFlowBottle(pop, color, opacity, quantity, world:b2World) {
        var locate = this;
        var particleSystem:b2ParticleSystem = world.particleSystems[0];
        var sphere = new THREE.SphereGeometry(0.1, 32, 32);
        var spawnPoint = new b2Vec2(-2, -5);
        var color_process = this.get_color(color, opacity, locate.tools);
        var index_calqueSelected = Math.floor(Math.random() * 11) + 1;
        if (index_calqueSelected == 8)
            index_calqueSelected = 1;
        var timeout = setTimeout(function () {
            locate.graphics.RenderRotor('static/physics/img/calque' + index_calqueSelected + '.png',
                                                                    spawnPoint.x,spawnPoint.y);

            var count = 3;
            while (quantity > 1) {
                console.log(quantity + " ---- " + count)
                var timeout2 = setTimeout(function (particleSystem) {
                    var box = new b2PolygonShape();
                    box.SetAsBoxXYCenterAngle(0.5, 0.1, spawnPoint, 0.7);

                    var particlegroupDef = new b2ParticleGroupDef();
                    particlegroupDef.shape = box;
                    particlegroupDef.flags = b2_colorMixingParticle | b2_waterParticle;

                    particlegroupDef.color.Set(color_process.r, color_process.g, color_process.b, color_process.a);

                    var bottle_flow = new b2BodyDef();
                    bottle_flow.type = b2_dynamicBody;
                    bottle_flow.position.Set(2, 2);

                    var first_record = particleSystem.GetPositionBuffer().length / 2;
                    particleSystem.CreateParticleGroup(particlegroupDef);

                    world.CreateBody(bottle_flow);
                    var second_record = particleSystem.GetPositionBuffer().length / 2;

                    for (var i = 0; i < second_record - first_record; i++) {
                        var mesh = new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({color: 0xFFFF00}));
                        locate.graphics.scene.add(mesh);
                        locate.circleArr.push(mesh);
                        locate.circleIndex.push(locate.circleArr.length - 1);
                    }
                }, 1000 * count, particleSystem);
                locate.events.AddEvent(timeout2);
                quantity -= 1;
                count += 1;
            }
            var timeout2 = setTimeout(function (color_process, particleSystem) {
                var box = new b2PolygonShape();
                console.log(quantity + " <<<---- ")
                box.SetAsBoxXYCenterAngle(0.5, 0.1 * quantity, spawnPoint, 0.7);

                var particlegroupDef:b2ParticleGroupDef = new b2ParticleGroupDef();
                particlegroupDef.shape = box;
                particlegroupDef.flags = b2_colorMixingParticle | b2_waterParticle;
                particlegroupDef.color.Set(color_process.r, color_process.g, color_process.b, color_process.a);


                var bottle_flow = new b2BodyDef();
                bottle_flow.type = b2_dynamicBody;
                bottle_flow.position.Set(2, 2);


                var first_record = particleSystem.GetPositionBuffer().length / 2;

                particleSystem.CreateParticleGroup(particlegroupDef);
                world.CreateBody(bottle_flow);
                var second_record = particleSystem.GetPositionBuffer().length / 2;

                for (var i = 0; i < second_record - first_record; i++) {
                    var mesh = new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({color: 0xFFFF00}));
                    locate.graphics.scene.add(mesh);
                    locate.circleArr.push(mesh);
                    locate.circleIndex.push(locate.circleArr.length - 1);
                }
            }, 1000 * count, color_process, particleSystem);
            locate.events.AddEvent(timeout2);
            //locate.graphics.GetStage().addChild(bottle);
        }, pop, color_process, particleSystem);
        locate.events.AddEvent(timeout);
    }


}