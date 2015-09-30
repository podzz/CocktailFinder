import os
from py2neo import Graph

def FormatLine(line):
    array = line.split(':', 1)
    array[1] = array[1].split(',')
    for i in range(0,len(array[1])):
    	if array[1][i][0] == ' ':
    		array[1][i] = array[1][i][1:]
    	array[1][i] = array[1][i][0:7]
    return array


graph = Graph("http://neo4j:secret@127.0.0.1:7474/db/data/")

if os.path.isfile('ColorDataMining.json'):
    with open('ColorDataMining.json') as colorFile:
        listLines = colorFile.readlines()
        for line in listLines:
        	array = FormatLine(line)
        	graph.cypher.execute("MATCH (in:Ingredient) WHERE in.name={colorName} SET in.colors={colors}",
        	    {"colorName": array[0],"colors":array[1]})



