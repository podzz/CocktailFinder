all:
	scrapy crawl url -o webtender/spiders/url.csv -t csv
	scrapy crawl cocktail -o export/cocktail.json

clean:
	find . -name "*.pyc" -type f -delete
	find . -name "*.json" -type f -delete
	find . -name "*.csv" -type f -delete

install:
	pip intall scrapy
