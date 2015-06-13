var app = angular.module('TodoApp', [
    'ngRoute',
    'appController',
    'todoDirectives',
    ]);

app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.
        when('/', {
                templateUrl: '../static/todo.html',
                controller: 'TodoController'
            }).
        when('secondPage', {
                templateUrl: '../static/secondPage.html',
                controller: 'SecondController'
            }).
        otherwise({redirectTo: '/'});
    }]);

app.factory('windowAlert', [
        '$window',
        function($window) {
            return $window.alert;
        }
])
