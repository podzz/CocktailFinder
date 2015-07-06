angular.module('adminApp.services',[]).factory('Ingredient', function($resource) {
    return $resource('http://localhost:3000/api/ingredients/:id', {id:'@index'}, {
        update: {
            method: 'PUT'
        }
    });
}).factory('Glass', function($resource) {
    return $resource('http://localhost:3000/api/glasses/:id', {id:'@index'}, {
        update: {
            method: 'PUT'
        }
    });
}).factory('Recipe', function($resource) {
    return $resource('http://localhost:3000/api/recipes/:id', {id:'@index'}, {
        update: {
            method: 'PUT'
        }
    });
}).service('popupService',function($window) {
    this.showPopup = function(message) {
        return $window.confirm(message);
    }
});