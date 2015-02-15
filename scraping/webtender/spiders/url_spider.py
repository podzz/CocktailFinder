import scrapy

from webtender.items import UrlItem

class UrlSpider(scrapy.Spider):
    name = "url"
    allowed_domains = ["webtender.com"]

    temp_list = []
    index = 1
    max_index = 6215;

    while index < max_index :
        temp_list.append("http://www.webtender.com/db/browse?level=2&dir=drinks&char=*&start="
                + str(index))
        index += 150

    start_urls = temp_list

    def parse(self, response):
        for sel in response.xpath('//ul/li'):
        	item = UrlItem()
        	item["url"] = sel.xpath('a/@href').extract()
        	yield item
