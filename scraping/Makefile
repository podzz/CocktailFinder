webtender:
	scrapy crawl url -o webtender/spiders/url.csv -t csv
	cd webtender/spiders && scrapy crawl cocktail -o ../../export/cocktail.csv -t csv

1001cocktail:
	scrapy crawl graal-url -o export/crawl-url.csv -t csv
	scrapy crawl graal-spider -o export/crawl-data.csv -t csv

export-data:
	cd export && python export_column.py

clean:
	find . -name "*.pyc" -type f -delete
	find . -name "*.json" -type f -delete
	find scrapcocktail -name "*.csv" -type f -delete

install:
	pip intall scrapy
