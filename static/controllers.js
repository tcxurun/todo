'use strict';

/* Controllers */
var appController = angular.module('appController', []);

appController.controller('TodoController', [
    '$scope',
    '$http',
    'windowAlert',
      function($scope, $http, windowAlert) {
            $scope.RETRIEVE_DEFAULT_NR = 5;
            $scope.state = {};
            $scope.state.todoList = [];
            $scope.state.retrieveNr = $scope.RETRIEVE_DEFAULT_NR;
            $scope.state.pageName = 'todoList';


            $scope.addItem = function() {
                if(!$scope.state.newItem) {
                    windowAlert("text field must be non-empty");
                } else {
                    $http
                    .post('/todoAdd', {
                        item: $scope.state.newItem
                    })
                    .success(function(data, status, headers, config) {
                        if(data.success) {
                            $scope.retrieveLastNItems(
                                $scope.state.retrieveNr
                            );
                        } else {
                            windowAlert('Adding of item failed');
                        }
                    })
                    .error(function(data, status, headers, config){
                    })
                }
            };

            $scope.retrieveLastNItems = function(n) {
                $http
                    .get('/todoRetrieve/' + n)
                    .success(function(data, status, headers, config) {
                        if(data.success) {
                            $scope.state.todoList = data.todoList;
                        } else {
                            windowAlert('Retrieval failed');
                        }
                    })
                    .error(function(data, status, headers, config) {
                        windowAlert('Retrieval failed');
                    });
            };

            $scope.setAndRetrieveLastNItems = function(n) {
                $scope.state.retrieveNr = n;
                $scope.retrieveLastNItems($scope.state.retrieveNr);
            };
}]);

appController.controller('SecondController',[
       '$scope',
        function($scope) {
            $scope.state = {};
            $scope.state.pageName = 'secondPage';
        }
    ])
