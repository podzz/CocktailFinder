/// <reference path="lib/liquidfun.d.ts"/>
/// <reference path="lib/pixi.d.ts"/>

class Contact implements b2ContactFilter {
    ShouldCollide(particleSystem:b2ParticleSystem, particleIndexA:number, particleIndexB:number) {
        console.log('test');
    }
}