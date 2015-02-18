import scrapy

from scrapcocktail.items import UrlCocktailItem

def char_range(c1, c2):
    for c in xrange(ord(c1), ord(c2) + 1):
        yield chr(c)

class GraalUrl(scrapy.Spider):
    name = "graal-url"
    allowed_domains = ["1001cocktails.com"]

    start_urls = ["http://www.1001cocktails.com/cocktails/lister_cocktails.php3"]
    for c in char_range('A', 'Z'):
    	count = 0
        while count < 350:
            if count > 0:
                url = "http://www.1001cocktails.com/cocktails/" + str(count) + "-liste-cocktails-commencant-par-" + c + ".html"
            else:
                url = "http://www.1001cocktails.com/cocktails/liste-cocktails-commencant-par-" + c + ".html"
            count = count + 50
            start_urls.append(url)

    def parse(self, response):
        urls_exp = response.xpath("//div[@id='content']//a[re:match(@href,'/cocktails/')][re:match(@title,'Cocktail')][re:match(@style,'font-weight:bold')]/@href").extract()

        if len(urls_exp) > 0:
            for s in urls_exp:
                item = UrlCocktailItem()
                item["url"] = s
                yield item
