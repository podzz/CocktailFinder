import scrapy
import json
import os.path

from scrapcocktail.items import CocktailGraalItem
from pprint import pprint

class GraalSpider(scrapy.Spider):
    name = "graal-spider"
    allowed_domains = ["1001cocktails.com"]

    urls = []
    index = 0
    if os.path.isfile('export/crawl-url.csv'):
        with open('export/crawl-url.csv') as f:
            for line in f:
                if index != 0:
                    urls.append(line[:-2])
                index = index + 1
        start_urls = urls
    else:
    	start_urls = []


    def parse(self, response):
        item = CocktailGraalItem()
        item["name"] = response.xpath("//html//body//div[1]//div[6]//div//table//h1//text()").extract()[0][:-1]


        ingredients_list = []
        for s in response.xpath("//html//body//div[1]//div[6]//div//table//span[@itemprop='ingredients']"):
        	number = s.xpath("text()").extract()
        	if len(number) < 1:
        		number = ""
        	else:
        		number = number[0][:-1]
        	mesure = s.xpath("a[re:match(@title,'mesure')]//text()").extract()
        	if len(mesure) < 1:
        		mesure = ""
        	else:
        		mesure = mesure[0]
        	liquid = s.xpath("a[re:match(@href,'/cocktails/')]//text()").extract()
        	if len(liquid) < 1:
        		liquid = ""
        	else:
        		liquid = liquid[0]
        	ingredients_list.append((number,mesure,liquid))

        recipient = response.xpath("/html/body/div[1]/div[6]/div[1]/span[3]/a/u//text()").extract()
        if len(recipient) < 1:
        	item["recipient"] = ""
        else:
        	item["recipient"] = recipient[0]
        item["ingredients"] = ingredients_list

        yield item
