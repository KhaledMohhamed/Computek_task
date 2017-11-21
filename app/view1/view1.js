'use strict';

angular.module('myApp.view1', ['ui.router'])


    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'view1/view1.html',
                controller: 'View1Ctrl'
            })
            .state('user', {
                url: 'user/:id',
                templateUrl: 'view2/view2.html',
                parent:'home',
                controller: 'View2Ctr2'
            });

    }])
    .controller('View1Ctrl', function($scope, $http , $state) {
        $http.get("https://api.github.com/users")
            .then(function(response) {
                $scope.users = response.data;
                $state.go('user', { "id": 1});
            });
    })
    .controller('View2Ctr2',function($scope,$stateParams,$http,$state) {
        $http.get("https://api.github.com/user/"+$stateParams.id)
            .then(function(response) {
                $scope.user = response.data;
                console.log(response.data);
            })
            .catch(function (data) {
                $state.go('user', { "id": 1});
            }) ;

    });
