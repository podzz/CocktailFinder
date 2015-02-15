import scrapy
import json
import os.path

from webtender.items import CocktailItem
from pprint import pprint

class UrlSpider(scrapy.Spider):
    name = "cocktail"
    allowed_domains = ["webtender.com"]

    urls = []
    index = 0
    if os.path.isfile('url.csv'):
        with open('url.csv') as f:
            for line in f:
                if index != 0:
                    urls.append(line[3:-4])
                index = index + 1
        start_urls = urls
    else:
    	start_urls = []


    def parse(self, response):
        cocktail = CocktailItem()
        cocktail["name"] = response.xpath('//td/h1/text()').extract()
        cocktail["instructions"] = response.xpath('//td/p/text()').extract()[0]

        ingredients = []
        for li_item in response.xpath('//td/ul/li'):
        	ingredients.append(li_item.xpath('text()').extract()[0] + li_item.xpath('a/text()').extract()[0])
        cocktail["ingredients"] = ingredients

        cocktail["alcohol"] = response.xpath('//tr/td/small/text()').extract()[1]

        cocktail["category"] = response.xpath('//tr/td/small/text()').extract()[0]

        cocktail["recipe"] = response.xpath('//tr/td/small/a/text()').extract()[0]

        yield cocktail
