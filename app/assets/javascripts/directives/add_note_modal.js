/**
 * Created by vlad on 12.12.2016.
 */
virtualDrawer.directive('addNoteModal', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            scope.toggleModalAddNote = function() {
                element.modal('toggle');
            };
        }
    }
});