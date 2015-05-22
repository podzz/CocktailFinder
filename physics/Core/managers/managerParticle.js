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


function addFlowBottle(pop, color) {
    function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
    function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
    function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
    function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}

    var timeout = setTimeout(function() {
        var color_process = {r: hexToR(color), g: hexToG(color), b: hexToB(color)};
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
        var timeout2 = setTimeout(function () {
            var spawnPoint = new b2Vec2(width / METER / 2 - 1, 0.2);

            var box = new b2PolygonShape();
            box.SetAsBoxXYCenterAngle(0.1, 0.8, spawnPoint, -0.3);

            var particlegroupDef = new b2ParticleGroupDef();
            particlegroupDef.shape = box;
            particlegroupDef.flags = b2_colorMixingParticle;
            particlegroupDef.color.Set(color_process.r, color_process.g, color_process.b, color_process.a);


            var bottle_flow = new b2BodyDef();
            bottle_flow.type = b2_dynamicBody;
            bottle_flow.position.Set(2,2);


            var first_record = particleSystem.GetPositionBuffer().length / 2;

            particleSystem.CreateParticleGroup(particlegroupDef);
            world.CreateBody(bottle_flow);
            var second_record = particleSystem.GetPositionBuffer().length / 2;
            for (var i = 0; i < second_record - first_record; i++) {
                var graphics = new PIXI.Graphics();
                stage.addChild(graphics);
                circleArr.push(graphics);
                circleIndex.push(circleArr.length - 1);
                pondContainer.addChild(graphics);
            }
        }, 2000);
        eventArray.push(timeout2);
        stage.addChild(bottle);
    }, pop);
    eventArray.push(timeout);
}
