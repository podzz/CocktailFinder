/**
 * Created by Adrien on 08/04/2015.
 */
/// <reference path="../lib/liquidfun.d.ts"/>
/// <reference path="../lib/pixi.d.ts"/>
class ManagerShape {
    PIXI: any;
    width:number = 0;
    height:number = 0;
    METER:number = 0;

    constructor(width:number, height:number, METER:number) {
        this.width = width;
        this.height = height;
        this.METER = METER;
    }

    loadGround(body: any, arr) {
        var vectors = [];

        var x_center = (this.width / this.METER / 2) - 1;
        var y_center = 0.2;

        var width_rampe = 0.9;
        var mid_width_rampe = width_rampe / 2;

        var shapeFlow = new b2EdgeShape();
        //var origin = new
        shapeFlow.Set(new b2Vec2(x_center - mid_width_rampe - 0.5, y_center - 2),
                      new b2Vec2(x_center + mid_width_rampe, y_center + 2));
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