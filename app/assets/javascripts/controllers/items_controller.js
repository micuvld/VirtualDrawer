/**
 * Created by vlad on 03.11.2016.
 */
virtualDrawer.controller('ItemsController', ['$scope', '$http', function($scope,$http) {
    $scope.items = [];

    function getItemsForTag() {
        $http({
            url:window.location.href,
            method:'GET',
            headers: {
                'Accept': 'application/json'
            }
        }).then(function(result) {
            console.log(result);
            $scope.items = result.data
        });
    }

    getItemsForTag();


    $scope.downloadItem = function(itemId) {
        window.location = "/download/" + itemId;
    }
}]);