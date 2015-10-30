class Recipe {
    constructor() {}

    public generateDistribution(ingredient: any, glassQuantity:number):any
    {
        var distribution:any=[];
        var ingr_pop = 0;
        if (ingredient) {
            var totalQuantity = 0;


            for (var i = 0; i < ingredient.length; i++) {
                var ingr = ingredient[i];
                var qua = ingr.quantity;
                if (qua == null)
                    qua = 1;
                else
                    qua = qua.replace(';', '.');
                qua = parseFloat(qua);
                qua = Math.ceil(qua);
                totalQuantity = totalQuantity + qua;
            }


            for (var i = 0; i < ingredient.length; i++) {
                var ingr = ingredient[i];
                var qua = ingr.quantity;
                if (qua == null)
                    qua = 1;
                else
                    qua = qua.replace(';', '.');
                qua = parseFloat(qua);
                qua = Math.ceil(qua);
                var r = Math.ceil(qua / totalQuantity * glassQuantity);

                if (ingr.selectedColor && ingr.selectedColor != "#null") {
                    distribution.push({ 'pop': ingr_pop, 'color': ingr.selectedColor, 'opacity': ingr.opacity, 'quantity': r});
                    ingr_pop += r * 400;
                }
            }
        }
        return distribution;
    }
}


