var api = angular.module('picturesApi', []);

api.factory('picturesApi', ['$http', function ($http) {

  var BASE_URL = 'https://api.instagram.com/v1';
  var client_id = 'd49da08a520f47cbb6e7618f077f33ef';
  var picturesInterface = {};

    picturesInterface.popular = function ( callback ) {
      var endpoint = this.BASE_URL + '/media/popular?client_id=' + this.config.client_id;
        $http.get( endpoint ).then( function (response) {
          return response.data;
      });
    };

    picturesInterface.tagsByName = function ( name, callback ) {
      var endpoint = this.BASE_URL + '/tags/' + name + '/media/recent?client_id=' + this.config.client_id;
      return $http.get( endpoint, callback );
    };

  return picturesInterface;
}]);
