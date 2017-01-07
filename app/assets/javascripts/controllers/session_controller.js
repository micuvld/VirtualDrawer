/**
 * Created by vlad on 03.11.2016.
 */
virtualDrawer.controller('SessionController', ['$scope', '$http', function($scope,$http) {
    $scope.registerOrLogin = function() {
    	$http(
            {
                url:'login',
                method:'POST',
                data: {
                    username: $scope.username,
                    password: $scope.password
                },
                headers: {
                    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
                }
            })
            .then(function(result) {
            	console.log(result);
                if (result.data.status == "success") {
                	if (result.data.type == "login") {
                		alert("Successfully logged in!");
                	} else {
                		alert("Successfully registered!");
                	}
                	window.location.href = "/";
                } else {
                	alert("Login failed (username already exists, but the password is wrong)")
                }
            }
        );
    }
}]);