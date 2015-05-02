/**
 * Created by Adrien on 08/04/2015.
 */

function getAllParticle() {
    var psd = new b2ParticleSystemDef();
    psd.radius = 0.04;
    psd.dampingStrength = 0.4;

    if (particleSystem != null)
        world.DestroyParticleSystem(particleSystem);
    particleSystem = world.CreateParticleSystem(psd);

    var r_random = Math.floor(Math.random() * 256) + 50;
    var g_random = Math.floor(Math.random() * 256) + 50;
    var b_random = Math.floor(Math.random() * 256) + 50;
    var a_random = Math.floor(Math.random() * 256);

    var box2 = new b2PolygonShape();
    box2.SetAsBoxXYCenterAngle(0.1, 0.8, new b2Vec2($("#cocktailRenderer").width() /METER / 2 - 0.3, 1.0), 0);
    var particleGroupDef2 = new b2ParticleGroupDef();
    particleGroupDef2.shape = box2;
    particleGroupDef2.flags = b2_colorMixingParticle;
    //particleGroupDef2.color.Set(255,150,0,255);
    particleGroupDef2.color.Set(r_random, g_random, b_random, a_random);


    var r_random2 = Math.floor(Math.random() * 255) + 50;
    var g_random2 = Math.floor(Math.random() * 255) + 50;
    var b_random2 = Math.floor(Math.random() * 255) + 50;
    var a_random2 = Math.floor(Math.random() * 255);

    var box3 = new b2PolygonShape();
    box3.SetAsBoxXYCenterAngle(0.1, 0.8, new b2Vec2($("#cocktailRenderer").width() /METER / 2 + 0.3, 1.0), 0);
    var particleGroupDef3 = new b2ParticleGroupDef();
    particleGroupDef3.shape = box3;
    particleGroupDef3.flags = b2_colorMixingParticle;
    //particleGroupDef3.color.Set(255,255,255,20);
    particleGroupDef3.color.Set(r_random2, g_random2, b_random2, a_random2);

    var box4 = new b2PolygonShape();
    box4.SetAsBoxXYCenterAngle(0.5, 0.5, new b2Vec2(2.5, 2.5), 0);
    var particleGroupDef4 = new b2ParticleGroupDef();
    particleGroupDef4.shape = box4;
    particleGroupDef4.flags = b2_colorMixingParticle;
    particleGroupDef4.color.Set(0,0,0,200);

    particleSystem.CreateParticleGroup(particleGroupDef2);
    particleSystem.CreateParticleGroup(particleGroupDef3);
    //particleSystem.CreateParticleGroup(particleGroupDef4);
}
