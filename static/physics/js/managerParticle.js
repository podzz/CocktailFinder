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
    //psd.colorMixingStrength = 0.8;
    psd.colorMixingStrength = 0.01;

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

function addFlowBottle(pop, color, opacity, quantity) {
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
        bottle.x = width / 2 - 200;
        bottle.y = -200;
        bottle.alpha = 0.9;
        spriteArray.push(bottle);
        //anim(bottle).to({y: 30}, 1);
        anim(bottle).to({y: height / 3 - rotorBodyHeight * METER / 1.8}, 1);
        anim(bottle).to({x: (width / 5) - 40 + rotorBodyWidth * METER / 5}, 1);
        anim(bottle).to({rotation: 2.2}, 1);
        anim(bottle).to(2 + 4 * quantity, {y: -200}, 0.5);
        var count = 1;
        while (quantity > 1) {
            console.log(quantity + " ---- " + count)
            var timeout2 = setTimeout(function () {
                var xPoint = (width / METER / 5) - glassScale / 1.5 + rotorBodyWidth / 2;
                var yPoint = height / METER / 3 - rotorBodyHeight / 1.5;
                console.debug(xPoint);
                var spawnPoint = new b2Vec2(xPoint, yPoint);

                var box = new b2PolygonShape();
                box.SetAsBoxXYCenterAngle(0.7, 0.1, spawnPoint, 0.7);

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
                groupParticleStage.filters = [blur];
                for (var i = 0; i < second_record - first_record; i++) {
                    var graphics = new PIXI.Graphics();

                    groupParticleStage.addChild(graphics);
                    circleArr.push(graphics);
                    circleIndex.push(circleArr.length - 1);
                }
                particleStage.addChild(groupParticleStage);
            }, 1000 * count);
            eventArray.push(timeout2);
            quantity -= 1;
            count += 3;
        }
        var timeout2 = setTimeout(function () {
            var spawnPoint = new b2Vec2((width / METER / 5) - glassScale / 1.5 + rotorBodyWidth / 2, height / METER / 3 - rotorBodyHeight / 1.5);

            var box = new b2PolygonShape();
            console.log(quantity + " <<<---- ")
            box.SetAsBoxXYCenterAngle(0.7 * quantity, 0.1 * quantity, spawnPoint, 0.7);

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
            groupParticleStage.filters = [blur];
            for (var i = 0; i < second_record - first_record; i++) {
                var graphics = new PIXI.Graphics();

                groupParticleStage.addChild(graphics);
                circleArr.push(graphics);
                circleIndex.push(circleArr.length - 1);
            }
            particleStage.addChild(groupParticleStage);
        }, 1000 * count);
        eventArray.push(timeout2);
        stage.addChild(bottle);
    }, pop);
    eventArray.push(timeout);
}
