/**
 * Created by vlad on 12.12.2016.
 */
virtualDrawer.directive('editNoteModal', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            scope.toggleModalEditNote = function() {
                element.modal('toggle');
            };
        }
    }
});