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
        var particleGroupDef = new b2ParticleGroupDef();
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
    for (var i = 1; i <= 11; i++)
        calqueList.push('RecipesImage/calque' + i + '.png');

    var image = new Image();
    image.src = calqueList[Math.floor(Math.random() * 11)];
    var base = new PIXI.BaseTexture(image);
    var texture = new PIXI.Texture(base);
    var bottle = new PIXI.Sprite(texture);

    bottle.width = 150;
    bottle.height = 300;
    bottle.anchor.x = 0.5;
    bottle.anchor.y = 0.5;
    bottle.x = width / 2 - 110;
    bottle.y = height / 2 - 400;
    spriteArray.push(bottle);
    var rotationInterval = setInterval(function () {
        if (bottle.rotation < 2.2) {
            bottle.rotation += 0.02;
        }
        else {
            var spawnPoint = new b2Vec2(width / 2 / METER, 1);
            var t = new Date();
            t.setSeconds(t.getSeconds() + totalSecond);
            var r_random = Math.floor(Math.random() * 256) + 50;
            var g_random = Math.floor(Math.random() * 256) + 50;
            var b_random = Math.floor(Math.random() * 256) + 50;
            var a_random = Math.floor(Math.random() * 256);
            var box = new b2CircleShape();
            box.position.Set(spawnPoint.x, spawnPoint.y);
            box.radius = 0.05;

            var particleGroupDef = new b2ParticleGroupDef();
            particleGroupDef.shape = box;
            particleGroupDef.flags = b2_colorMixingParticle;
            particleGroupDef.color.Set(r_random, g_random, b_random, a_random);

            var refreshIntervalId = setInterval(function () {
                var first_record = particleSystem.GetPositionBuffer().length / 2;

                particleSystem.CreateParticleGroup(particleGroupDef);
                var second_record = particleSystem.GetPositionBuffer().length / 2;
                for (var i = 0; i < second_record - first_record; i++) {
                    var graphics = new PIXI.Graphics();
                    stage.addChild(graphics);
                    circleArr.push(graphics);
                    pondContainer.addChild(graphics);
                }

                if (t < new Date()) {
                    var upBottle = setInterval(function () {
                        bottle.rotation -= 0.01;
                        bottle.y -= 1;
                    }, 10);
                    setTimeout(function () {
                        clearInterval(upBottle);
                    }, 5000);
                    eventArray.push(upBottle);
                    clearInterval(refreshIntervalId);
                }

            }, reset);
            eventArray.push(refreshIntervalId);

            clearInterval(rotationInterval);
        }
    }, 10);

    stage.addChild(bottle);
    eventArray.push(rotationInterval);
}
