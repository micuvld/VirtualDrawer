virtualDrawer.controller('NotesController', ['$scope', '$http', function($scope,$http) {
    $scope.note = "";
    $scope.tagSearchText = "";
    $scope.tags = "";
    
    $scope.$on('addNote', function(event, data) {
    	console.log(data);
		$scope.tags = data;
	})

	$scope.addNote = function() {
		console.log($scope.note);
		$http(
        {
            url:'/upload',
            method:'POST',
            params: {
            	username: 'oneName',
            	note: $scope.note,
            	item_type: 'note'
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
}]);