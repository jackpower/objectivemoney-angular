omApp.controller('customerFeedbackController', ['$scope', '$http', '$location', function($scope, $http, $location) {
    
    $scope.feedback = {find:'',improve:'',email:'',phoneNumber:'',npsScore:''};
    
    $scope.checkModel = {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
        10: false
      };
    
    $scope.$watchCollection('checkModel', function () {
    $scope.checkResults = [];
    angular.forEach($scope.checkModel, function (value, key) {
      if (value) {
        $scope.checkResults.push(key);
      }
    });
  });
    
    
    $scope.submit = function() {
        $http.post('php/postCustomerFeedback.php',{ 'feedback' : $scope.feedback })
                .success(function (result) {

                    console.log(result);
                    $location.path("feedbackthanks");

                })
                .error(function (data, status) {
    
                    console.log(data);

                });
    };
    
}]);