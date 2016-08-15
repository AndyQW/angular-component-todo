'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp')
.component('app',{
        templateUrl: './components/app/app.html',
        controller: function(){

        }
})
.config(config);

function config($locationProvider, $urlRouterProvider) {
  'ngInject';
  $locationProvider.html5Mode(true);

  $urlRouterProvider.otherwise('/todo');
};
