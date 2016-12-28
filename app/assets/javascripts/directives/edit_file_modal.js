/**
 * Created by vlad on 12.12.2016.
 */
virtualDrawer.directive('editFileModal', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            scope.toggleModalEditFile = function() {
                element.modal('toggle');
            };
        }
    }
});