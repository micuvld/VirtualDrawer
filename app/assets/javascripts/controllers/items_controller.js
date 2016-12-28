/**
 * Created by vlad on 03.11.2016.
 */
virtualDrawer.controller('ItemsController', ['$scope', '$http', function($scope,$http) {
    $scope.items = [];
    $scope.hoveredItemId = -1;

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

    $scope.itemAction = function(item) {
        if (item.item_type == 'file') {
            window.location = "/download/" + item.id;
        }
    }

    $scope.deleteItem = function(itemId) {
        $http(
            {
                url:'/items',
                method:'DELETE',
                params: {
                    username: 'oneName',
                    item_id: itemId
                },
                headers: {
                    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
                }
            })
            .then(function(result) {
                    getItemsForTag();
                }
        );
    }

    $scope.toggleEditItem = function(item) {
        if (item.item_type == 'file') {
            $scope.itemToEdit = item;
            $scope.toggleModalEditFile();
        } else {
            $scope.toggleModalEditNote();
            $scope.$broadcast('editNote', item);
        }
    }

    $scope.editFile = function() {
        console.log($scope.itemToEdit);
        $http(
        {
            url:'/items',
            method:'PUT',
            params: {
                username: 'oneName',
                item_id: $scope.itemToEdit.id,
                name: $scope.itemToEdit.name,
                item_type: 'file'
            },
            headers: {
                "Content-Type": "application/json",
                'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
            }
        })
        .then(function(result) {
                console.log(result);
            }
        );
    }

    $scope.showButtonsForItem = function(itemId) {
        $scope.hoveredItemId = itemId;
    }

    $scope.editButtonIsVisible = function(itemId) {
        return itemId == $scope.hoveredItemId
    }
}]);