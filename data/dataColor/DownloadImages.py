import json,shutil,os,urllib,ComputeImage,string,random,workerpool
from threading import Thread
from PIL import Image
from pprint import pprint
from random import randint

jsonData = {}

data = ""
ingredients_data = ""
ingredient_list = []
folders = []
image_path = "Images"
ingredient_num = 0
total_folder = 0
url_api="http://localhost:3000/bing/search/"

def id_generator(size=6, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))

class WorkerJob(workerpool.Job):
    def __init__(self, search,number):
        self.search = search
        self.number = number

    def run(self):
        print "Search : " + self.search + " - " + str(self.number) + "/" + str(total_folder)
        url= url_api + self.search
        response = urllib.urlopen(url)
        data = json.loads(response.read())
        for ingredient in data:
            listUrl = data[ingredient]
            colors_array = []
            image_temp = id_generator(32) + ".jpeg"
            path_image = image_path + "/" + image_temp
            for imageIngredient in listUrl:
                image_temp = id_generator(32) + ".jpeg"
                url_formatted = imageIngredient.encode('utf-8')
                color = []
                try:
                    urllib.urlretrieve(url_formatted, path_image)
                    color = ComputeImage.colorz(path_image)
                    os.remove(path_image)
                except Exception as err:
                    color = []

                for aux_color in color:
                    colors_array.append(aux_color)
            jsonData[self.search] = colors_array
            #print(colors_array)
            print 'done for ' + self.search
            json_file = open('ColorDataMining.json', 'a')
            colors_string = ', '.join(str(x) for x in colors_array)
            json_file.write(self.search + ':' + colors_string + '\n')
            json_file.close()


with open('Tools/ingredient.json') as IngredientList:
    ingredients_data = json.load(IngredientList)

for row in ingredients_data['data']:
	ingredient_list.append(row[0].encode('utf-8'))
total_folder = len(ingredient_list)

pool = workerpool.WorkerPool(size=20)

for str_in in ingredient_list:
    if ingredient_num > 935:
    	job = WorkerJob(str_in, ingredient_num)
    	pool.put(job)
    ingredient_num = ingredient_num + 1

pool.wait()
pool.shutdown()

#json_file = open('ColorDataMining.json', 'w')
#json_file.write(json.dumps(jsonData))
#json_file.close()

