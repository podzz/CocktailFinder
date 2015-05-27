/**
 * Created by Adrien on 08/04/2015.
 */
var eventArray = [];
var spriteArray = [];


function initParticle() {
    var psd = new b2ParticleSystemDef();
    psd.radius = 0.05;
    psd.dampingStrength = 0.4;
    psd.viscousStrength = 0.05;
    psd.colorMixingStrength = 0.8;

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


function addFlowBottle(pop, color, opacity) {
    function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
    function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
    function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
    function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}

    var timeout = setTimeout(function() {
        var color_process = null;
        if (opacity == null)
            color_process = {r: hexToR(color), g: hexToG(color), b: hexToB(color), a: 255};
        else
            color_process = {r: hexToR(color), g: hexToG(color), b: hexToB(color), a: opacity};
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
        anim(bottle).to({y: 30}, 1);
        anim(bottle).to({x: 200}, 1);
        anim(bottle).to({rotation: 2.2}, 1);
        anim(bottle).to(4, {y: -200}, 0.5);
        var timeout2 = setTimeout(function () {
            var spawnPoint = new b2Vec2((width / METER / 4) - glassScale / 2 + rotorBodyWidth / 2, height / METER / 3 - rotorBodyHeight / 1.5);

            var box = new b2PolygonShape();
            box.SetAsBoxXYCenterAngle(0.7, 0.1, spawnPoint, 0.7);

            var particlegroupDef = new b2ParticleGroupDef();
            particlegroupDef.shape = box;
            particlegroupDef.flags = b2_colorMixingParticle | b2_viscousParticle;

            particlegroupDef.color.Set(color_process.r, color_process.g, color_process.b, color_process.a);


            var bottle_flow = new b2BodyDef();
            bottle_flow.type = b2_dynamicBody;
            bottle_flow.position.Set(2,2);


            var first_record = particleSystem.GetPositionBuffer().length / 2;

            particleSystem.CreateParticleGroup(particlegroupDef);
            world.CreateBody(bottle_flow);
            var second_record = particleSystem.GetPositionBuffer().length / 2;
            var groupParticleStage = new PIXI.Container();
            groupParticleStage.filters = [new PIXI.filters.DropShadowFilter()];
            for (var i = 0; i < second_record - first_record; i++) {
                var graphics = new PIXI.Graphics();
                groupParticleStage.addChild(graphics);
                circleArr.push(graphics);
                circleIndex.push(circleArr.length - 1);
            }
            particleStage.addChild(groupParticleStage);
        }, 2000);
        eventArray.push(timeout2);
        stage.addChild(bottle);
    }, pop);
    eventArray.push(timeout);
}
