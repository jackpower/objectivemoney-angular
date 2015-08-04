omApp.controller('resourcesController', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location) {
    
    $scope.readMore = function(path) {
        $location.path(path);
    };
    
    $scope.blogCategory = "All";
    $scope.setBlogCategory = function(blogCategory) {
        $location.path('/resources');
        $scope.blogCategory = blogCategory;
    };
    
    $scope.currentPath = $location.path();
    
    $scope.loadShareThis = function() {
        stButtons.makeButtons();
    };    
}]);

omApp.directive("blogSidebar", function() {
    return {
        restrict: 'EC',
        templateUrl: 'directives/blogSidebar.html',
        replace: true,
        scope: {
        blogCategory: "=",    
        setBlogCategory: "&",
        currentPath: "=",
        loadShareThis: "&"
        }
    }
});