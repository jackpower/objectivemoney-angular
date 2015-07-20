omApp.controller('resourcesController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {

}]);

omApp.directive("blogExcerpt", function() {
    return {
        restrict: 'EC',
        templateUrl: 'directives/blogexcerpt.html',
        replace: true,
        scope: {
        blogPost: "="
        }
    }
});