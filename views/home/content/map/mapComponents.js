angular.module('xPlan')
    .controller('componentCtrl', function ($scope) {
        $scope.showTextEditor=false;
        $scope.showMap=true;
        $scope.showSearchPanel = true;
        $scope.showLocationSearch = false;
        $scope.showSpaceSearch = true;
        $scope.showLocationSearchInput = function () {
            $scope.showLocationSearch = true;
            $scope.showSpaceSearch = false;
        };
        $scope.showSpaceSearchInput = function () {
            $scope.showLocationSearch = false;
            $scope.showSpaceSearch = true;
        };
        $scope.showMapContent=function () {
            $scope.showMap=true;
            $scope.showSearchPanel = true;
            $scope.showTextEditor=false
        };
        $scope.showTextContent=function () {
            $scope.showMap=false;
            $scope.showSearchPanel = false;
            $scope.showTextEditor=true
        }
    });