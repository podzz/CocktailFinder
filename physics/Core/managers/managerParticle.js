/**
 * Created by Adrien on 08/04/2015.
 */
var eventArray = [];
var spriteArray = [];


function initParticle() {
    var psd = new b2ParticleSystemDef();
    psd.radius = 0.04;
    psd.dampingStrength = 0.4;

    if (world.particleSystems[0] != null)
        world.DestroyParticleSystem(world.particleSystems[0]);
    particleSystem = world.CreateParticleSystem(psd);
}

function resetTimeline() {
    for (var key in eventArray) {
        clearInterval(eventArray[key]);
    }
    eventArray = [];
}

function addColorGroup(timeline, width_box, height_box) {
    var refreshIntervalId = setInterval(function () {
        clearInterval(refreshIntervalId);
        var first_record = particleSystem.GetPositionBuffer().length / 2;
        var r_random = Math.floor(Math.random() * 256) + 50;
        var g_random = Math.floor(Math.random() * 256) + 50;
        var b_random = Math.floor(Math.random() * 256) + 50;
        var a_random = Math.floor(Math.random() * 256);

        var box = new b2PolygonShape();
        box.SetAsBoxXYCenterAngle(width_box, height_box, spawnPoint, 0);
        particleGroupDef = new b2ParticleGroupDef();
        particleGroupDef.shape = box;
        particleGroupDef.flags = b2_colorMixingParticle;

        particleGroupDef.color.Set(r_random, g_random, b_random, a_random);
        particleSystem.CreateParticleGroup(particleGroupDef);
        var second_record = particleSystem.GetPositionBuffer().length / 2;
        for (var i = 0; i < second_record - first_record; i++) {
            var graphics = new PIXI.Graphics();
            stage.addChild(graphics);
            circleArr.push(graphics);
            pondContainer.addChild(graphics);

        }

    }, timeline);
    eventArray.push(refreshIntervalId);
}

function addFlowBottle(reset, totalSecond, radius) {
    var calqueList = [];
    var index_calqueSelected = Math.floor(Math.random() * 11) + 1;
    var calqueSelected = 'Assets/RecipesImage/calque' + index_calqueSelected + '.png';

    var image = new Image();
    image.src = calqueSelected;
    var base = new PIXI.BaseTexture(image);
    var texture = new PIXI.Texture(base);
    var bottle = new PIXI.Sprite(texture);

    bottle.width = 150;
    bottle.height = 300;
    bottle.anchor.x = 0.5;
    bottle.anchor.y = 0.5;
    bottle.x = width / 2 - 115;
    bottle.y = -200;
    spriteArray.push(bottle);
    anim(bottle).to({y: height / 2 - 400}, 1);
    anim(bottle).to({rotation: 2.9}, 1);
    anim(bottle).to(2, {y: -200}, 5);
    var timeout = setTimeout(function() {
    var spawnPoint = new b2Vec2(width / METER / 2 - 1, 0.2);

    var r_random = Math.floor(Math.random() * 256) + 50;
    var g_random = Math.floor(Math.random() * 256) + 50;
    var b_random = Math.floor(Math.random() * 256) + 50;
    var a_random = Math.floor(Math.random() * 256);
    var box = new b2PolygonShape();
    box.SetAsBoxXYCenterAngle(0.1, 0.8, spawnPoint, -0.3);

    var particlegroupDef = new b2ParticleGroupDef();
    particlegroupDef.shape = box;

    particlegroupDef.flags = b2_colorMixingParticle;
    particlegroupDef.color.Set(r_random, g_random, b_random, a_random);

    var first_record = particleSystem.GetPositionBuffer().length / 2;

    particleSystem.CreateParticleGroup(particlegroupDef);
    var second_record = particleSystem.GetPositionBuffer().length / 2;
    for (var i = 0; i < second_record - first_record; i++) {
        var graphics = new PIXI.Graphics();
        stage.addChild(graphics);
        circleArr.push(graphics);
        circleIndex.push(circleArr.length - 1);
        pondContainer.addChild(graphics);
    }
    },2000);
    stage.addChild(bottle);
}
