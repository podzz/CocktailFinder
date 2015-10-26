# CocktailFinder
A web application to easily find available cocktail to mix in your house !

# Installation

This project currently uses 3 Vagrant instances to handle all the workload.
First make sure you have Vagrant and VirtualBox installed.

You can then navigate to /infra and in each folder, run :
```
sh$>vagrant up
```
As soon as the provisioning is done on the three instances, you can access the app through the url localhost:8080

This deployment procedure will soon be replaced with an Ansible environement.

## More deployment info

The 3 vagrant instances uses a private network to communicate. The box used in each VM is a standard Ubuntu 12.04 LTS "precise64".

The first VM (LBserv) holds an Nginx server, handling the load balancing, static content serving, and the API cache. You can easily add more API nodes for load balancing by adding new IPs in the Nginx configuration file.

The APIserv VM handles the calls for the frontoffice single page application.
It uses an Express.js server. The server uses multithreading to enhance performance, launching one thread per core. It also handles zero down time, with a restart on error and zero down time deployment in case of file change. All this behavior can be changed using the config file :

```
api/config.js
```

The last VM hosts the database, Neo4j. The link (routing + auth) with the API is handled directly in the API config.

#Cocktail Finder front-Office API

All the source code associated with the front-office app is under the directory :
```
api/
```

The running behavior (Multithreading, restart on error and zero down time deployment) is handled in the file :
```
api/api.js
```

And the application routes are located in :
```
api/core.js
```

##API Routes
```
GET:/api/missing/:array
```

Request that returns a list of 5 classic recipes with the ingredients if the array is not specified.

You can specify a list of comma separated integer values to specify which ingredient to exclude.

This request is cached with node-cache.

Example : /api/missing/1,2,34

JSON Output :

```
{
    "cocktails": [{
        "index": "4",
        "name": "Alaska",
        "recipe_index": "2",
        "ingredient": [{
            "index": "13",
            "quantity": "2",
            "unity": "cl de",
            "genericUnity": null,
            "genericQuantity": null,
            "name": "chartreuse verte",
            "colors": ["#547c45", "#000000", "#c6c998", "#2d3929", "#6fad56", "#fbfbfa", "#84bb5d", "#435251", "#fefefe", "#313a22", "#b9b7b5", "#9a9997", "#7e9977", "#3b453f", "#d0d6e4"],
            "opacity": "255",
            "selectedColor": "#6fad56"
        }, {
            "index": "5",
            "quantity": "4",
            "unity": "cl de",
            "genericUnity": null,
            "genericQuantity": null,
            "name": "gin",
            "colors": ["#964245", "#fcfcfc", "#bfbaba", "#010101", "#e5ebeb", "#4f93af", "#c1d0db", "#435fb5", "#fafcfc", "#35383d", "#59a5d2", "#fafdfc"],
            "opacity": null,
            "selectedColor": "#bfbaba"
        }]
    }]
}
```
#Cocktail Finder back-Office API

By default this API is not ran at infrastructure deployment. You have to run it manually.
All the source code associated with the front-office app is under the directory :
```
backoffice/
```

And the application routes are located in :
```
backoffice/backoffice.js
```