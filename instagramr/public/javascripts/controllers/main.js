var ctrl = angular.module('mainController', []);

  ctrl.controller('mainCtrl', ['$scope', '$http', 'picturesApi', function ( $scope, $http, picturesApi ) {

var Instagramr = {
  config: {},
  BASE_URL: 'https://api.instagram.com/v1',

  init: function ( opt ) {
    opt = opt || {};
    this.config.client_id = opt.client_id;
  },

  popular: function ( callback ) {
    var endpoint = this.BASE_URL + '/media/popular?client_id=' + this.config.client_id +'&callback=JSON_CALLBACK';
    this.getJSON( endpoint, callback );
  },

  tagsByName: function ( name, callback ) {
    var endpoint = this.BASE_URL + '/tags/' + name + '/media/recent?client_id=' + this.config.client_id + '&callback=JSON_CALLBACK';
    this.getJSON( endpoint, callback );
  },

  // getJSON: function ( url, callback ) {
  //   $.ajax({
  //     type: 'GET',
  //     url: url,
  //     dataType: 'jsonp',
  //     success: function ( response ) {
  //       if ( typeof callback === 'function') callback( response);
  //     }
  //   });
  // }
  getJSON : function ( url, callback ) {
    $http.jsonp( url ).then(function ( response ) {
      $scope.photos = response.data;
      callback( $scope.photos );
    });
  }
};

  Instagramr.init({
    client_id: 'd49da08a520f47cbb6e7618f077f33ef'
    // client_id: 'e3fd398a2f1b4c3fab2fd82110be4ab9'
  });


  $(document).ready(function () {

    Instagramr.popular( function ( response ) {
      var $instagram = $('#instagram');
      for (var i = 0; i < response.data.length; i++) {
        imageUrl = response.data[i].images.low_resolution.url;
        $instagram.append('<img src="' + imageUrl +'"/>');
      }
    });

  

    var searchBar = $('#search-bar');
     searchBar.on('submit', function (e) {
       e.preventDefault();
       var tagName = $('input').val();

       Instagramr.tagsByName( tagName, function ( response ) {
           var $instagram = $('#instagram');
               $instagram.html('');
           for (var i = 0; i < response.data.length; i++) {
             imageUrl = response.data[i].images.low_resolution.url;
             $instagram.append('<img src="' + imageUrl +'"/>');
           }
       } );
     });
  });

}]);
