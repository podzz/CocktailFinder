import csv

recipe_list = []
ingredients_list = []
measure_list = []

with open('crawl-data.csv') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        if row['recipe'] not in recipe_list and row['recipe'] != "":
        	recipe_list.append(row['recipe'])
        for switchcase in eval(row['ingredients']):
        	if switchcase[2] not in ingredients_list:
        		ingredients_list.append(switchcase[2])
        	if switchcase[1] not in measure_list:
        		measure_list.append(switchcase[1])

with open('crawl-data-recipes.csv', 'wb') as csvfile:
        spamwriter = csv.writer(csvfile)
        for s in sorted(recipe_list):
            spamwriter.writerow([s])

with open('crawl-data-fluids.csv', 'wb') as csvfile:
        spamwriter = csv.writer(csvfile)
        for s in sorted(ingredients_list):
            spamwriter.writerow([s.encode('utf-8')])


with open('crawl-data-measures.csv', 'wb') as csvfile:
        spamwriter = csv.writer(csvfile)
        for s in sorted(measure_list):
            spamwriter.writerow([s.encode('utf-8')])
