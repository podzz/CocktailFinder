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

    var box2 = new b2PolygonShape();
    box2.SetAsBoxXYCenterAngle(0.2, 0.2, new b2Vec2(2.5, 2.5), 0);
    var particleGroupDef2 = new b2ParticleGroupDef();
    particleGroupDef2.shape = box2;
    particleGroupDef2.flags = b2_colorMixingParticle;
    particleGroupDef2.color.Set(200,245,245,255);

    var box3 = new b2PolygonShape();
    box3.SetAsBoxXYCenterAngle(0.2, 0.2, new b2Vec2(2.5, 3.5), 0);
    var particleGroupDef3 = new b2ParticleGroupDef();
    particleGroupDef3.shape = box3;
    particleGroupDef3.flags = b2_colorMixingParticle;
    particleGroupDef3.color.Set(255,255,100,255);

    var box4 = new b2PolygonShape();
    box4.SetAsBoxXYCenterAngle(0.2, 0.2, new b2Vec2(2.5, 1.5), 0);
    var particleGroupDef4 = new b2ParticleGroupDef();
    particleGroupDef4.shape = box4;
    particleGroupDef4.flags = b2_colorMixingParticle;
    particleGroupDef4.color.Set(255,100,50,255);

    particleSystem.CreateParticleGroup(particleGroupDef2);
    particleSystem.CreateParticleGroup(particleGroupDef3);
    particleSystem.CreateParticleGroup(particleGroupDef4);
}
