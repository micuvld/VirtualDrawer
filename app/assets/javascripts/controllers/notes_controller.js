virtualDrawer.controller('NotesController', ['$scope', '$http', function($scope,$http) {
    $scope.note = "";
    $scope.tagSearchText = "";
    $scope.tags = "";
    
    $scope.$on('addNote', function(event, data) {
    	console.log(data);
		$scope.tags = data;
	})

    $scope.$on('editNote', function(event, data) {
        console.log(data);
        $scope.note = {
            id: data.id,
            name: data.name,
            details: data.details
        }
    })

	$scope.addNote = function() {
		console.log($scope.note);
		$http(
        {
            url:'/upload',
            method:'POST',
            params: {
            	username: 'oneName',
            	note: $scope.note.name,
                details: $scope.note.details,
                tag_name: $scope.note.tag.name,
            	item_type: 'note'
        	},
        	headers: {
        		"Content-Type": "application/json",
				'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        	}
        })
        .then(function(result) {
                location.reload();
            }
        );
	}

    $scope.editNote = function() {
        console.log($scope.note);
        $http(
        {
            url:'/items',
            method:'PUT',
            params: {
                username: 'oneName',
                item_id: $scope.note.id,
                name: $scope.note.name,
                details: $scope.note.details,
                item_type: 'note'
            },
            headers: {
                "Content-Type": "application/json",
                'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
            }
        })
        .then(function(result) {
                $scope.$emit('refreshItems');
            }
        );
    }
}]);