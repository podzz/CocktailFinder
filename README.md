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

GET:/api/cocktail/id

Basic API request that returns the JSON data associated to the id in param.

GET:/api/missing/:array

Request that returns a list of 5 classic recipes with the ingredients if the array is not specified.

You can specify a list of comma separated integer values to specify which ingredient to exclude.

Example : /api/missing/1,2,34

JSON Structure :

```
{
  "cocktails": [
    {
      "name": "Une recette aléatoire",
      "ingredients": [
        {
          "id": 392
          "name": "jus de carote",
          "quantity": 4,
          "unity": "cl"
        },
        {
          "id": 1298
          "name": "vodka",
          "quantity": 12,
          "unity": "cl"
        }
      ],
      "glass_path": "http://..."
    },
    {
      "name": "MyCocktail",
      "ingredients": [
        {
          "id": 121,
          "name": "jus de carote",
          "quantity": 4,
          "unity": "cl"
        },
        {
          "id": 898
          "name": "ju carote",
          "quantity": 12,
          "unity": "cl"
        }
      ],
      "glass_path": "http://..."
    }
  ]
}
```
