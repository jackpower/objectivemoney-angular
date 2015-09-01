//Create a planner profile service for use across the planner registration controller
/*omApp.factory("modalTimer",function(){

    /*$scope.popUpBarClosed = false;
    $scope.setClosePopUpBar = function() {
        $scope.popUpBarClosed = true;
    };    
    
    $scope.popUpBarOpen = false;
    $scope.setpopUpBarOpen = function() {
            if($location.path(" ") && !$scope.popUpBarClosed) {
                $timeout(function(){
                $scope.popUpBarOpen = true;
                },5000);
            };
            if($scope.popUpBarClosed) {
                $scope.popUpBarOpen = false;
            }; 
    };
    
    return console.log("HELLO");
    
});