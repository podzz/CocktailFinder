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


Cocktail Finder API
===================

GET:/cocktail

Basic API request that returns a list of recipes with the ingredients.

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
