/**
 * Created by vlad on 29.10.2016.
 */
virtualDrawer.controller('SideNavController', function ($scope, $timeout, $mdSidenav, $log, $http) {
    $http(
        {
            url:'/tags',
            method:'GET',
            params: {username: 'oneName'}
        })
        .then(function(result) {
                $scope.navigateTags = result.data.map(function(elem) {
                    return {
                        name: elem.name,
                        id: elem.id
                    }
                });
            }
    );
    $scope.switchToTag = function(tagId) {
        window.location = "/items/" + tagId;
    }

    $scope.goHome = function() {
        window.location = "/";
    }

    $scope.toggleAddNoteModal = function() {
        $scope.toggleModalAddNote();
        $scope.$broadcast('addNote', $scope.navigateTags);
    }
});

