import csv

recipe_list = []
ingredients_list = []
measure_list = []
recipient_list = []

count_recipe = 1
count_ingredients = 1
count_recipient = 1

with open('crawl-data.csv') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        if len([item for item in recipe_list if item[1] == row["name"]]) == 0:
        	recipe_list.append((count_recipe, row["name"]))
        	count_recipe = count_recipe + 1
        if len([item for item in recipient_list if item[1] == row["recipient"]]) == 0:
            recipient_list.append((count_recipient, row["recipient"]))
            count_recipient = count_recipient + 1
        for switchcase in eval(row['ingredients']):
        	if len([item for item in ingredients_list if item[1] == switchcase[2]]) == 0:
        		ingredients_list.append((count_ingredients,switchcase[2]))
        		count_ingredients = count_ingredients + 1

with open('liquids.csv', 'wb') as csvfile:
        spamwriter = csv.writer(csvfile)
        spamwriter.writerow(['index', 'name'])
        for (id_ing,s) in ingredients_list:
        	spamwriter.writerow([id_ing, s.encode('utf-8')])

with open('recipes.csv', 'wb') as csvfile:
        spamwriter = csv.writer(csvfile)
        spamwriter.writerow(['index', 'name'])
        for (id_recipe,s) in recipe_list:
        	spamwriter.writerow([id_recipe, s])

with open('recipient.csv', 'wb') as csvfile:
        spamwriter = csv.writer(csvfile)
        spamwriter.writerow(['index','name'])
        for (id_rec, s) in recipient_list:
        	spamwriter.writerow([id_rec, s])

with open('recipes_link_liquids.csv', 'wb') as csvfile:
    spamwriter = csv.writer(csvfile)
    spamwriter.writerow(['id_recipe', 'quantity', 'measure', 'id_ingredient'])
    with open('crawl-data.csv') as csvreadfile:
        reader = csv.DictReader(csvreadfile)
        for row in reader:
            recipe_id = [str(item[0]) for item in recipe_list if row['name'] == item[1]][0]
            for triple in eval(row['ingredients']):
                ingredient_id = [str(item[0]) for item in ingredients_list if triple[2] == item[1]][0]
            	spamwriter.writerow([recipe_id, triple[0].encode('utf-8'),triple[1].encode('utf-8'),ingredient_id])

with open('recipes_link_recipient.csv', 'wb') as csvfile:
    spamwriter = csv.writer(csvfile)
    spamwriter.writerow(['id_recipe', 'id_recipient'])
    with open('crawl-data.csv') as csvreadfile:
        reader = csv.DictReader(csvreadfile)
        for row in reader:
            recipe_id = [str(item[0]) for item in recipe_list if row['name'] == item[1]][0]
            recipient_id = [str(item[0]) for item in recipient_list if row['recipient'] == item[1]][0]
            spamwriter.writerow([recipe_id, recipient_id])