# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html

import scrapy

def serialize_url(value):
    s = "http://www.webtender.com"
    return [s + aux for aux in value]

def serialize_cocktail_url(value):
    s = "http://www.1001cocktails.com"
    return s + value

class UrlItem(scrapy.Item):
    url = scrapy.Field(serializer=serialize_url)

class UrlCocktailItem(scrapy.Item):
    url = scrapy.Field(serializer=serialize_cocktail_url)

class CocktailGraalItem(scrapy.Item):
    name = scrapy.Field()
    ingredients = scrapy.Field()
    recipient = scrapy.Field()

class CocktailItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    name = scrapy.Field()
    alcohol = scrapy.Field()
    category = scrapy.Field()
    recipe = scrapy.Field()

    ingredients = scrapy.Field()
    instructions = scrapy.Field()
