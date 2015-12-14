/// <reference path="lib/liquidfun.d.ts"/>
/// <reference path="lib/pixi.d.ts"/>
/// <reference path="lib/greensock.d.ts"/>
/// <reference path="lib/jquery.d.ts"/>
/// <reference path="lib/three.d.ts"/>
/// <reference path="Graphics.ts"/>
/// <reference path="Tools.ts"/>

class Particle {
    tools:Tools;

    graphics:Graphics;
    events:Events;
    effect:THREE.MarchingCubes;

    objectMeshArr:THREE.Mesh[] = [];
    circleArr:THREE.Mesh[] = [];
    objectMeshIndex:number[] = [];
    circleIndex:number[] = [];
    objectPhysicsArr:any[] = [];
    icecubeMaterial:THREE.Texture;

    constructor(graphics, events, tools) {
        this.graphics = graphics;
        this.events = events;
        this.tools = tools;

        var textureLoader = new THREE.TextureLoader();
        var ref = this;
        textureLoader.load("static/physics/img/icecube2.png", function (tex:THREE.Texture) {
            tex.needsUpdate = true;
            ref.icecubeMaterial = tex;
        });


        /// MARCHING CUBES
        var mesh =  new THREE.MeshPhongMaterial( { color: 0x333333, specular: 0xffffff, shininess: 2, vertexColors: THREE.VertexColors });
        this.effect = new THREE.MarchingCubes(50, mesh, true, true);
        this.effect.position.set(0,0,0);
        this.effect.scale.set(700,700,700);

        this.effect.enableUvs = false;
        this.effect.enableColors = false;

        this.graphics.scene.add(this.effect);
    }

    public Reset() {
        this.objectMeshArr = [];
        this.circleIndex = [];
        this.circleArr = [];
        this.objectMeshIndex = [];
        this.objectPhysicsArr = [];
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

    public AddRandomParticleGroup(world:b2World, x, y, color)
    {
        var box:b2CircleShape = new b2CircleShape();
        var spawnPoint = new b2Vec2(x, y);
        box.position.y = y - 0.4;
        box.position.x = x;
        box.radius = 0.02;
        var sphere = new THREE.SphereGeometry(0.1, 0.1, 0.1);

        var particlegroupDef:b2ParticleGroupDef = new b2ParticleGroupDef();
        var particleSystem:b2ParticleSystem = world.particleSystems[0];
        particlegroupDef.shape = box;
        particlegroupDef.flags = b2_colorMixingParticle | b2_waterParticle;

        var random = new THREE.Color(color);
        particlegroupDef.color.Set(random.r * 255,random.g * 255,random.b * 255,Math.random() * 255);

        var first_record = particleSystem.GetPositionBuffer().length / 2;
        particleSystem.CreateParticleGroup(particlegroupDef);

        var second_record = particleSystem.GetPositionBuffer().length / 2;

        for (var i = 0; i < second_record - first_record; i++) {
            var mesh = new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({color: random.getHex()}));
            mesh.renderOrder = 1;
            mesh.material.depthTest = false;
            this.circleArr.push(mesh);
            this.circleIndex.push(this.circleArr.length - 1);
            this.graphics.scene.add(mesh);
        }
    }

    public AddParticleGroup(particleSystem:b2ParticleSystem, spawnPoint, color:any, world:b2World, sphere:THREE.Geometry,
                             graphics:Graphics, circleArr:any[], circleIndex:any[]):void {
        var box:b2PolygonShape = new b2PolygonShape();
        box.SetAsBoxXYCenterAngle(0.5, 0.1, spawnPoint, 0.7);

        var particlegroupDef:b2ParticleGroupDef = new b2ParticleGroupDef();
        particlegroupDef.shape = box;
        particlegroupDef.flags = b2_colorMixingParticle | b2_waterParticle | b2_particleContactFilterParticle | b2_fixtureContactFilterParticle;

        particlegroupDef.color.Set(color.r, color.g, color.b, color.a);

        var bottle:b2BodyDef = new b2BodyDef();
        bottle.type = b2_dynamicBody;
        bottle.position.Set(2, 2);

        var first_record = particleSystem.GetPositionBuffer().length / 2;
        particleSystem.CreateParticleGroup(particlegroupDef);



        world.CreateBody(bottle);
        var second_record = particleSystem.GetPositionBuffer().length / 2;

        for (var i = 0; i < second_record - first_record; i++) {
            var mesh = new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({color: 0xFFFF00, transparent: true}));
            mesh.renderOrder = 2;
            mesh.material.depthTest = false;
            graphics.scene.add(mesh);
            circleArr.push(mesh);
            circleIndex.push(circleArr.length - 1);
            graphics.scene.add(mesh);
        }
    }

    public addFlowBottle(pop, color, opacity, quantity, world:b2World) {
        console.log(pop);
        var locate = this;
        var system:b2ParticleSystem = world.particleSystems[0];
        var sphere = new THREE.SphereGeometry(0.1, 0.09, 0);
        var spawnPoint:b2Vec2 = new b2Vec2(-2.2, -5);
        var color_process = this.get_color(color, opacity, locate.tools);
        var index_calqueSelected = Math.floor(Math.random() * 11) + 1;
        if (index_calqueSelected == 8)
            index_calqueSelected = 1;
        var baseQuantity = quantity;
        var timeout = setTimeout(function () {
            locate.graphics.RenderRotor('static/physics/img/calque' + index_calqueSelected + '.png', spawnPoint, baseQuantity * 1.5 * 0.4); // 0.4 is the 400ms of timeout to spawn one liquid.
            var timeout1 = setTimeout(function() {
                while (quantity > 1) {
                    var timeout2 = setTimeout(function () {
                        locate.AddParticleGroup(system, spawnPoint, color_process, world, sphere, locate.graphics, locate.circleArr, locate.circleIndex);
                    }, 400 * (baseQuantity - quantity));
                    quantity -= 1;
                    locate.events.AddEvent(timeout2);
                }
                locate.events.AddEvent(timeout2);
            }, 2000); // Timeout1 added to have time between the bottle's spawn and the liquid's one.
            locate.events.AddEvent(timeout1);
        }, pop);
        locate.events.AddEvent(timeout);
    }

    public addIceCube(offsetX:number, offsetY:number, size:number, world:b2World) {
        var bodyDef = new b2BodyDef;
        var fixDef = new b2FixtureDef;
        fixDef.density = 0.6;
        fixDef.friction = Math.random() * 10;
        fixDef.restitution = 0.2;

        bodyDef.type = b2_dynamicBody;
        bodyDef.userData = 1;

        var box:b2CircleShape = new b2CircleShape();
        box.position.x = offsetX;
        box.position.y = offsetY;
        box.radius = 0.2;

        fixDef.shape = box;
        bodyDef.position.x = offsetX;
        bodyDef.position.y = offsetY;

        var b = world.CreateBody(bodyDef);

        var f:b2Fixture = b.CreateFixtureFromDef(fixDef);
        b.userData = 1;
        var sphere = new THREE.BoxGeometry(0.9, 0.9, 0);

        var mesh_material = new THREE.MeshBasicMaterial( { map: this.icecubeMaterial, transparent: true});
        var mesh = new THREE.Mesh(sphere, mesh_material);
        mesh.renderOrder = 2;

        this.graphics.recipeScene.add(mesh);


        this.objectMeshArr.push(mesh);
        this.objectMeshIndex.push(this.objectMeshArr.length - 1);
        var tuple: [b2Body, number] = [b,0];
        this.objectPhysicsArr.push(tuple);

        var tl = new TimelineLite();
        var tl2 = new TimelineLite();
        //console.log(f.shape.radius);
        tl.to(mesh.scale, 30, {x: 0.3, y: 0.3});
    }
}