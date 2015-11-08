var endpoint = 'http://localhost:8080/backofficeApi'

angular.module('adminApp.services',[]).factory('Ingredient', function($resource) {
    return $resource(endpoint + '/ingredients/:id', {id:'@index'}, {
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
    return $resource(endpoint + '/glasses/:id', {id:'@index'}, {
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
    return $resource(endpoint + '/recipes/:id', {id:'@index'}, {
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