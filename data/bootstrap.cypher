MATCH (r:Recipe)-->(i:Ingredient) WITH i, count(r) AS cnt SET i.recipeCount = cnt;
MATCH (r:Recipe)--(i:Ingredient) WITH r, avg(i.recipeCount) AS average, count(i) as ingrCount SET r.recipeScore = average;
