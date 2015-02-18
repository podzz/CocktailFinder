CREATE CONSTRAINT ON (in:Ingredient) ASSERT in.name IS UNIQUE;
USING PERIODIC COMMIT
LOAD CSV FROM 'file:///home/edouard/CocktailFinder/data/crawl-data-fluids.csv' AS line
CREATE (:Ingredient { name: line[0]});
