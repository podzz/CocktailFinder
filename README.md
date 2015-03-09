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

/cocktail

'''
{
  "cocktails": [
    {
      "name": "MyCoktail",
      "ingredients": [
        {
          "name": "jus de carote",
          "quantity": 4,
          "unity": "cl"
        },
        {
          "name": "ju carote",
          "quantity": 12,
          "unity": "cl"
        }
      ],
      "glass_path": "http://..."
    },
    {
      "name": "MyCoktail",
      "ingredients": [
        {
          "name": "jus de carote",
          "quantity": 4,
          "unity": "cl"
        },
        {
          "name": "ju carote",
          "quantity": 12,
          "unity": "cl"
        }
      ],
      "glass_path": "http://..."
    }
  ]
}

'''
