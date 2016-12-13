/**
 * Created by vlad on 04.12.2016.
 */
virtualDrawer.directive('editTagModal', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            scope.toggleModalEdit = function() {
                element.modal('toggle');
            };
        }
    }
});