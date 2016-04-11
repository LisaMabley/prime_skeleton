var app = angular.module('skeletonApp', []);

app.controller("IndexController", ['$scope', '$http', function($scope, $http){
   $scope.lambicorn = {};
   $scope.lambicornList = [];

   var fetchLambicorns = function() {
       return $http.get('/lambicorns').then(function(response){
           if(response.status !== 200){
               throw new Error('Failed to fetch lambicorns from the API');
           }
           $scope.lambicorn = {};
           $scope.lambicornList = response.data;
           return response.data;
       })
   };

   $scope.add = function(lambicorn){
       return $http.post('/add', lambicorn).then(fetchLambicorns());
   };
   fetchLambicorns();
}]);
