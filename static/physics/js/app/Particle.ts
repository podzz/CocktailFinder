/// <reference path="lib/liquidfun.d.ts"/>
/// <reference path="lib/pixi.d.ts"/>
/// <reference path="lib/greensock.d.ts"/>
/// <reference path="Graphics.ts"/>
/// <reference path="Tools.ts"/>

class Particle {
    METER:number = 100;
    glassScale:number=1.9;

    tools:Tools;

    graphics:Graphics;
    events:Events;

    circleArr:PIXI.Graphics[]=[];
    circleIndex:number[]=[];

    constructor(graphics, events, tools) {
        this.graphics = graphics;
        this.events = events;
        this.tools = tools;
    }

    public Reset()
    {
        this.circleArr = [];
        this.circleIndex = [];
    }

    public addFlowBottle(pop, color, opacity, quantity, world:b2World) {
        var locate = this;
        var particleSystem:b2ParticleSystem = world.particleSystems[0];

        console.log('color : ' + color);
        var color_process = null;
        if (opacity == null)
            color_process = {r: locate.tools.hexToR(color), g: locate.tools.hexToG(color), b: locate.tools.hexToB(color), a: 255};
        else
            color_process = {r: locate.tools.hexToR(color), g: locate.tools.hexToG(color), b: locate.tools.hexToB(color), a: opacity};

        var timeout = setTimeout(function (color_process, particleSystem) {

            var calqueList = [];
            var index_calqueSelected = Math.floor(Math.random() * 11) + 1;
            if (index_calqueSelected == 8)
                index_calqueSelected = 1;
            var calqueSelected = 'static/physics/img/calque' + index_calqueSelected + '.png';

            var image = new Image();
            image.src = calqueSelected;
            var base = new PIXI.BaseTexture(image);
            var texture = new PIXI.Texture(base);
            var bottle = new PIXI.Sprite(texture);

            bottle.width = 150;
            bottle.height = 300;
            bottle.anchor.x = 0.5;
            bottle.anchor.y = 0.5;
            bottle.x = Tools.GetWidth() / 4;
            bottle.y = -300;
            bottle.alpha = 0.9;
            //spriteArray.push(bottle);

            var tl = new TimelineLite();

            tl.to(bottle, 2, { y: Tools.GetHeight() / 4, rotation: 2.2 });
            tl.to(bottle, 5, { y: -50, rotation: 0, alpha: 0}, '+=6');

            var count = 2;
            while (quantity > 1) {
                console.log(quantity + " ---- " + count)
                var timeout2 = setTimeout(function (particleSystem) {
                    var xPoint = (Tools.GetWidth() / locate.METER / 4);
                    var yPoint = Tools.GetHeight() / locate.METER / 4 - 0.2;
                    var spawnPoint = new b2Vec2(xPoint, yPoint);

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
                    var groupParticleStage = new PIXI.Container();
                    groupParticleStage.filters = [locate.graphics.GetBlur()];
                    for (var i = 0; i < second_record - first_record; i++) {
                        var graphicsC = new PIXI.Graphics();

                        groupParticleStage.addChild(graphicsC);
                        locate.circleArr.push(graphicsC);
                        locate.circleIndex.push(locate.circleArr.length - 1);
                    }
                    locate.graphics.GetParticleStage().addChild(groupParticleStage);
                }, 1000 * count, particleSystem);
                locate.events.AddEvent(timeout2);
                quantity -= 1;
                count += 1;
            }
            var timeout2 = setTimeout(function (color_process) {
                var spawnPoint = new b2Vec2((Tools.GetWidth() / locate.METER / 5) - locate.glassScale / 1.5 , Tools.GetHeight() / locate.METER / 3);

                var box = new b2PolygonShape();
                console.log(quantity + " <<<---- ")
                box.SetAsBoxXYCenterAngle(0.7 * quantity, 0.1 * quantity, spawnPoint, 0.7);

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
                var groupParticleStage = new PIXI.Container();
                groupParticleStage.filters = [locate.graphics.GetBlur()];
                for (var i = 0; i < second_record - first_record; i++) {
                    var graphicsC = new PIXI.Graphics();

                    groupParticleStage.addChild(graphicsC);
                    locate.circleArr.push(graphicsC);
                    locate.circleIndex.push(locate.circleArr.length - 1);
                }
                locate.graphics.GetParticleStage().addChild(groupParticleStage);
            }, 1000 * count, color_process);
            locate.events.AddEvent(timeout2);
            locate.graphics.GetStage().addChild(bottle);
        }, pop, color_process, particleSystem);
        locate.events.AddEvent(timeout);
    }


}