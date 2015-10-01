angular.module('adminApp.services',[]).factory('Ingredient', function($resource) {
    return $resource('http://localhost:3000/api/ingredients/:id', {id:'@index'}, {
        update: {
            method: 'PUT'
        },
        save: {
            params: {
                id:""
            },
            method: 'POST'
        }
    });
}).factory('Glass', function($resource) {
    return $resource('http://localhost:3000/api/glasses/:id', {id:'@index'}, {
        update: {
            method: 'PUT'
        },
        save: {
            params: {
                id:""
            },
            method: 'POST'
        }
    });
}).factory('Recipe', function($resource) {
    return $resource('http://localhost:3000/api/recipes/:id', {id:'@index'}, {
        update: {
            method: 'PUT'
        },
        save: {
            params: {
                id:""
            },
            method: 'POST'
        }
    });
}).service('popupService',function($window) {
    this.showPopup = function(message) {
        return $window.confirm(message);
    }
});