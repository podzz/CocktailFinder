MATCH (n)
OPTIONAL MATCH (n)-[r]-()
DELETE n,r;

CREATE CONSTRAINT ON (in:Ingredient) ASSERT in.index IS UNIQUE;
USING PERIODIC COMMIT
LOAD CSV FROM 'file:///Users/Francois/CocktailFinder/data/liquids.csv' AS line
CREATE (:Ingredient { index: line[0], name: line[1]});

CREATE CONSTRAINT ON (re:Recipe) ASSERT re.index IS UNIQUE;
USING PERIODIC COMMIT
LOAD CSV FROM 'file:///Users/Francois/CocktailFinder/data/recipes.csv' AS line
CREATE (:Recipe { index: line[0], name: line[1]});

LOAD CSV FROM 'file:///Users/Francois/CocktailFinder/data/recipes_link_liquids.csv' AS line
MATCH (re:Recipe) WHERE re.index=line[0]
MATCH (in:Ingredient) WHERE in.index=line[3]
CREATE UNIQUE (re)-[r:COMPOSED_OF{ quantity: line[1], unity: line[2] }]->(in);
