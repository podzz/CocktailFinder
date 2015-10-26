# CocktailFinder
A web application to easily find available cocktail to mix in your house !

How to install ?
================

Ensure a full setup of python.
If you doesn't have pip, run the following :
> - python get-pip.py
Then for all :
> - sudo make install

Scraping
========

Export JSON of WebTender cocktails :
```
sh$>make scrapy
```

To get the exported
> - Go to scraping/export folder
> - Enjoy with cocktail.csv


Database
========

TODO : explain the CSV import requests

Bootstraping the data imported :

Launch the node server, and access the following URLs (by order) :

- /bdd/rank/ingredients
- /bdd/rank/recipes


Cocktail Finder API
===================

GET:/api/cocktails

Basic API request that returns a list of 5 random recipes with the ingredients.

GET:/api/cocktail/id/:id

Basic API request that returns the JSON data associated to the id in param.


GET:/api/cocktail/name/:name

Basic API request that returns the JSON data associated to the name in param.

GET:/api/missing/:array

Request that returns a list of 5 classic recipes with the ingredients if the array is not specified.

You can specify a list of comma separated integer values to specify which ingredient to exclude.

Example : /api/missing/1,2,34

JSON Structure :

```
{
    "cocktails": [{
        "index": "4",
        "name": "Alaska",
        "recipe_index": "2",
        "ingredient": [{
            "index": "13",
            "quantity": "2",
            "unity": "cl de",
            "genericUnity": null,
            "genericQuantity": null,
            "name": "chartreuse verte",
            "colors": ["#547c45", "#000000", "#c6c998", "#2d3929", "#6fad56", "#fbfbfa", "#84bb5d", "#435251", "#fefefe", "#313a22", "#b9b7b5", "#9a9997", "#7e9977", "#3b453f", "#d0d6e4"],
            "opacity": "255",
            "selectedColor": "#6fad56"
        }, {
            "index": "5",
            "quantity": "4",
            "unity": "cl de",
            "genericUnity": null,
            "genericQuantity": null,
            "name": "gin",
            "colors": ["#964245", "#fcfcfc", "#bfbaba", "#010101", "#e5ebeb", "#4f93af", "#c1d0db", "#435fb5", "#fafcfc", "#35383d", "#59a5d2", "#fafdfc"],
            "opacity": null,
            "selectedColor": "#bfbaba"
        }]
    }]
}
```
