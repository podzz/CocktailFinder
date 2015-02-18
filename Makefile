scrapy:
	cd scraping && $(MAKE) 1001cocktail

runserver:
	cd server && $(MAKE) runserver

clean:
	cd scraping && $(MAKE) clean
