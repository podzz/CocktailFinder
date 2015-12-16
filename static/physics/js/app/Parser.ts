/// <reference path="lib/jquery.d.ts"/>
/// <reference path="lib/liquidfun.d.ts"/>
/// <reference path="Tools.ts"/>

class Parser {
    private hashLayerJson:{[id:string]: string;}={};
    private hashLayerPng:any={};
    private hashRotorJson:any={};

    private vectorsRecipes:any=[];
    private vectorsRotor:any=[];

    private METER: number = 100;

    private glassScale: number = 1.9;

    constructor(){
        this.hashLayerJson["1"] = "static/physics/json/sprite_0000_Calque-2.json";
        this.hashLayerJson["2"] = "static/physics/json/sprite_0001_Calque-3.json";
        this.hashLayerJson["3"] = "static/physics/json/sprite_0002_Calque-4.json";
        this.hashLayerJson["4"] = "static/physics/json/sprite_0003_Calque-5.json";
        this.hashLayerJson["5"] = "static/physics/json/sprite_0004_Calque-6.json";
        this.hashLayerJson["6"] = "static/physics/json/sprite_0000_Calque-2.json";
        this.hashLayerJson["7"] = "static/physics/json/sprite_0006_Calque-8.json";
        this.hashLayerJson["8"] = "static/physics/json/sprite_0007_Calque-9.json";
        this.hashLayerJson["9"] = "static/physics/json/sprite_0008_Calque-1.json";
        this.hashLayerJson["10"] = "static/physics/json/sprite_0000_Calque-2.json";
        this.hashLayerJson["11"] = "static/physics/json/sprite_0001_Calque-3.json";
        this.hashLayerJson["12"] = "static/physics/json/sprite_0002_Calque-4.json";

        this.hashLayerPng["1"] = { path:"static/physics/img/sprite-low_0000_Calque-2.png", quantity: 40.0} ;
        this.hashLayerPng["2"] = { path:"static/physics/img/sprite-low_0001_Calque-3.png", quantity: 50.0} ;
        this.hashLayerPng["3"] = { path:"static/physics/img/sprite-low_0002_Calque-4.png", quantity: 20.0} ;
        this.hashLayerPng["4"] = { path:"static/physics/img/sprite-low_0003_Calque-5.png", quantity: 32.0} ;
        this.hashLayerPng["5"] = { path:"static/physics/img/sprite-low_0004_Calque-6.png", quantity: 15.0} ;
        this.hashLayerPng["6"] = { path:"static/physics/img/sprite-low_0000_Calque-2.png", quantity: 40.0} ;
        this.hashLayerPng["7"] = { path:"static/physics/img/sprite-low_0006_Calque-8.png", quantity: 70.0} ;
        this.hashLayerPng["8"] = { path:"static/physics/img/sprite-low_0007_Calque-9.png", quantity: 65.0} ;
        this.hashLayerPng["9"] = { path:"static/physics/img/sprite-low_0008_Calque-1.png", quantity: 20.0} ;
        this.hashLayerPng["10"] = { path:"static/physics/img/sprite-low_0000_Calque-2.png", quantity: 35.0} ;
        this.hashLayerPng["11"] = { path:"static/physics/img/sprite-low_0001_Calque-3.png", quantity: 45.0} ;
        this.hashLayerPng["12"] = { path:"static/physics/img/sprite-low_0002_Calque-4.png", quantity: 20.0} ;

        this.hashRotorJson["1"] = "static/physics/json/bottle.json";

        this.initRecipesVectors(this.hashLayerJson, this.vectorsRecipes);
        this.initRotorVectors(this.hashRotorJson, this.vectorsRotor);

        console.log("Parser created");
    }

    private initRecipesVectors(hash, vectorsRecipes:any)
    {
        for (var item in hash) {
            $.ajax({
                url: hash[item.toString()],
                async: false,
                dataType: "text",
                success: function (data) {
                    var f = JSON.parse(data);
                    var parse:any = f.rigidBodies[0].shapes[0].vertices;


                    var listPoint = [];
                    for (var i = 0; i < parse.length; i++) {
                        var vector = parse[i];
                        vector.x *= 2.8;    //Best Value found : 2.8
                        vector.y *= 4;      //Best Value found : 4
                        vector.x = vector.x - 0.5 * 2.8;    //Best Value found : -0.5 * 2.8
                        vector.y = -vector.y + 3.95;        //Best Value found : + 3.95
                        listPoint.push(vector);
                    }
                    vectorsRecipes[item] = listPoint;
                }
            });
        }
    }

    private initRotorVectors(hash, vectorsRotor) {
        for (var item in hash) {
            $.ajax({
                url: hash[item.toString()],
                async: false,
                dataType: "text",
                success: function (data) {
                    var f = JSON.parse(data);
                    var temp: any = f.rigidBodies[0].shapes[0].vertices;
                    var vectors = [];

                    var minX = 100;
                    var minY = 100;
                    var maxX = -100;
                    var maxY = -100;

                    for (var i = 0; i < temp.length; i++) {
                        var vector = temp[i];
                        vector.x *= 3;
                        vector.x = (Tools.GetWidth() / this.METER / 5) - this.glassScale / 1.5 + vector.x;

                        vector.y *= 3;
                        vector.y = Tools.GetHeight() / this.METER / 3 - vector.y;

                        if (vector.x < minX)
                            minX = vector.x;
                        if (vector.y < minY)
                            minY = vector.y;

                        if (vector.x > maxX)
                            maxX = vector.x;
                        if (vector.y > maxY)
                            maxY = vector.y;

                        vectors[i] = vector;
                    }

                   // rotorBodyWidth = maxX - minX;
                  //  rotorBodyHeight = maxY - minY;
                    vectorsRotor[item] = vectors;
                }
            });
        }
    }

    public getRecipe(recipeId)
    {
       return this.vectorsRecipes[recipeId.toString()];
    }

    public getRotor()
    {
        return this.vectorsRotor["1"];
    }

    public getRecipeImagePath(recipeId)
    {
        return this.hashLayerPng[recipeId.toString()];
    }

}
