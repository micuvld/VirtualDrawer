/**
 * Created by vlad on 04.12.2016.
 */
virtualDrawer.directive('newTagModal', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            scope.toggleModalNew = function() {
                element.modal('toggle');
            };
        }
    }
});