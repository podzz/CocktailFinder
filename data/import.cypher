MATCH (n)
OPTIONAL MATCH (n)-[r]-()
DELETE n,r;

CREATE CONSTRAINT ON (in:Ingredient) ASSERT in.index IS UNIQUE;
USING PERIODIC COMMIT
LOAD CSV WITH HEADERS FROM 'file:///Users/Francois/CocktailFinder/data/liquids.csv' AS line
CREATE (:Ingredient { index: line.index, name: line.name});

CREATE CONSTRAINT ON (re:Recipe) ASSERT re.index IS UNIQUE;
USING PERIODIC COMMIT
LOAD CSV WITH HEADERS FROM 'file:///Users/Francois/CocktailFinder/data/recipes.csv' AS line
CREATE (:Recipe { index: line.index, name: line.name});

CREATE CONSTRAINT ON (re:Recipient) ASSERT re.index IS UNIQUE;
USING PERIODIC COMMIT
LOAD CSV WITH HEADERS FROM 'file:///Users/Francois/CocktailFinder/data/recipient.csv' AS line
CREATE (:Recipient { index: line.index, name: line.name});

LOAD CSV WITH HEADERS FROM 'file:///Users/Francois/CocktailFinder/data/recipes_link_liquids.csv' AS line
MATCH (re:Recipe) WHERE re.index=line.id_recipe
MATCH (in:Ingredient) WHERE in.index=line.id_ingredient
CREATE UNIQUE (re)-[r:COMPOSED_OF{ quantity: line.quantity, unity: line.measure }]->(in);

LOAD CSV WITH HEADERS FROM 'file:///Users/Francois/CocktailFinder/data/recipes_link_recipient.csv' AS line
MATCH (re:Recipe) WHERE re.index=line.id_recipe
MATCH (rec:Recipient) WHERE rec.index=line.id_recipient
CREATE UNIQUE (re)-[r:SERVED_WITH]->(rec);
