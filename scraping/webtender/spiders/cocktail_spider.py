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
    if os.path.isfile('./url.csv'):
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

        cocktail["ingredients"] = ''.join(response.xpath('//td/ul/li//text()').extract())[:-1].split('\n')

        cocktail["alcohol"] = response.xpath('//tr/td/small/text()').extract()[1]

        cocktail["category"] = response.xpath('//tr/td/small/text()').extract()[0]

        cocktail["recipe"] = response.xpath('//tr/td/small/text()').extract()[2]
        if "votes" in cocktail["recipe"]:
            cocktail["recipe"] = response.xpath('//tr/td/small/a/text()').extract()[0]

        yield cocktail
