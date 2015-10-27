/// <reference path="lib/liquidfun.d.ts"/>
/// <reference path="lib/pixi.d.ts"/>
/// <reference path="Tools.ts"/>

declare var world:any;
class Shape {
    METER:number = 100;

    constructor() {
    }

    LoadGround(body:b2Body, arr, world_cpy:b2World) {
        world = world_cpy
        var vectors = [];

        var x_center = (Tools.GetWidth() / this.METER / 2) - 1;
        var y_center = 0.2;

        var width_rampe = 0.9;
        var mid_width_rampe = width_rampe / 2;

        var shapeFlow = new b2EdgeShape();
        //var origin = new
        shapeFlow.Set(new b2Vec2(0.3,5),
                      new b2Vec2(Tools.GetWidth() / this.METER - 0.3,5));
        //shapeFlow.SetTransform(0, 30);
        vectors.push(shapeFlow.vertex1);
        vectors.push(shapeFlow.vertex2);
        arr.push(vectors);
        body.CreateFixtureFromShape(shapeFlow, 10);
    }

    edgerender(recipeArr: Object, stage: any,glassLineStrength: number,
                glassLineColor: number) {
        var graphics = new PIXI.Graphics();

        graphics.lineStyle(glassLineStrength, glassLineColor);
        var vectorStart = recipeArr[0][0];
        var vectorEnd = recipeArr[0][1];
        graphics.moveTo(vectorStart.x * this.METER, vectorStart.y * this.METER);
        graphics.lineTo(vectorEnd.x * this.METER, vectorEnd.y * this.METER);
        graphics.endFill();

        stage.addChild(graphics);
    }
}