CREATE CONSTRAINT ON (in:Measure) ASSERT in.name IS UNIQUE;
USING PERIODIC COMMIT
LOAD CSV FROM 'file:///home/edouard/CocktailFinder/data/crawl-data-measures.csv' AS line
CREATE (:Measure { name: line[0]});
