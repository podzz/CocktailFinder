// Delete all the recipe containing "sirop" in the name
MATCH (re:Recipe) WHERE re.name =~ '(?i).*sirop.*'
OPTIONAL MATCH (re)-[r]-()
DELETE re,r;