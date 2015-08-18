omApp.controller('plannerRegController', ['$scope', '$location', '$log', 'plannerprof', 'plannerprofLanguages', '$http', function($scope, $location, $log, plannerprof, plannerprofLanguages, $http) {
    
    
    $scope.planner = {};
    $scope.planner={ name:'', email:'',number:''};
    
    $scope.submit = function() {
        $http.post('php/postPlannerEnquiry.php',{ 'planner' : $scope.planner })
                .success(function (result) {

                    console.log(result);
                    $location.path("/signupthanks");

                })
                .error(function (data, status) {
    
                    console.log(data);

                });
    };

    
    /*NOT CURRENTLY NEEDED, BUT WILL BE IMPLEMENTED ONCE THE AUTOMATIC PLANNER SIGN UP IS CREATED
    
    //PERSIST DATA ACROSS VIEWS
    //Inject the plannerprof service to ensure data persistency when in planner registration pages
    
    $scope.plannerprof = plannerprof;
    $scope.plannerprof.languages = plannerprofLanguages;
    
    //ROUTE TO CORRECT VIEW
    //A switch statement that allows the reuse of the submit function and routes to the next page of planner the registration form
    
    $scope.submit = function() {
        switch (window.location.hash) {
            case "#/login":
            $location.path("/register-aboutme");
            break;
            case "#/register-aboutme":
            $location.path("/register-myoffering");
            break;
            case "#/register-myoffering":
            $location.path("/register-clientpref");
            break;
            case "#/register-clientpref":
            $location.path("/plannerprofile");
            break;
        };
    };
    
    //
    
    $scope.getlanguagevalid = function() {
    if($scope.plannerprof.languages.english === true || $scope.plannerprof.languages.afrikaans === true || $scope.plannerprof.languages.zulu === true || $scope.plannerprof.languages.xhosa === true || $scope.plannerprof.languages.southernsotho === true || $scope.plannerprof.languages.tswana === true || $scope.plannerprof.languages.northernsotho === true || $scope.plannerprof.languages.tsonga === true || $scope.plannerprof.languages.venda === true || $scope.plannerprof.languages.swati === true || $scope.plannerprof.languages.ndebele === true) {
        $scope.languagevalid = true;
        } 
        else{
        $scope.languagevalid = false;
        }
        };
    
    
$scope.$watchGroup(['plannerprof.languages.english', 'plannerprof.languages.afrikaans', 'plannerprof.languages.zulu', 'plannerprof.languages.xhosa', 'plannerprof.languages.southernsotho', 'plannerprof.languages.tswana', 'plannerprof.languages.northernsotho', 'plannerprof.languages.tsonga', 'plannerprof.languages.venda', 'plannerprof.languages.swati', 'plannerprof.languages.ndebele'],function(){
     $scope.getlanguagevalid();
    });
    
    //DEAL WITH DROPDOWN MENUS
    //Qualifications
    //Create a list of potential qualifications that can be used in the dropdown menu
    
    $scope.quals = [
    {id: 'CFP', name: 'CFP'},
    {id: 'AFP', name: 'AFP'},
    {id: 'RFP', name: 'RFP'},
    {id: 'FSA', name: 'FSA'},
    {id: 'Undisclosed', name: 'Undisclosed'}
    ];
    
    //Create dropdown functionality
    
    $scope.status = {
    isopen1: false,
    isopen2: false,
    isopen3: false,
    isopen4: false,
    isopen5: false,
    isopen6: false,
    isopen7: false
    };

    $scope.toggled = function(open) {
    $log.log('Dropdown is now: ', open);
    };

    $scope.toggleDropdown = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.status.isopen = !$scope.status.isopen;
    };
    
    //DATE STUFF
    $scope.today = function() {
        $scope.dt = new Date();
    };
    
    $scope.today();    
    
    //Set the default value of the qualification to undisclosed
    
    //$scope.plannerprof.selectedQual = $scope.quals[4];
    
    //Create function that changes value of qualification to selected value on dropdown
    
    $scope.plannerprof.setQual = function(action) {
        $scope.plannerprof.selectedQual = action;
    };
    
    //Services
    //Create a list of potential services offering states that can be used in the dropdown menu
    
    $scope.services = [
    {id: 'inHouse', name: 'In House'},
    {id: 'outsource', name: 'Outsourced'},
    {id: 'notOffered', name: 'Not Offered'}
    ];
    
    //Set the default value of the investment offering state to not offered
    
    //$scope.plannerprof.selectedInvest = $scope.services[2];
    
    //Set the default value of the investment offering state to selected value on dropdown
    
    $scope.plannerprof.setInvest = function(action) {
        $scope.plannerprof.selectedInvest = action;
    };
    
    //Set the default value of the long term insurance offering state to not offered
    
    //$scope.plannerprof.selectedLT = $scope.services[2];
    
    //Set the default value of the long term insurance offering state to selected value on dropdown
    
    $scope.plannerprof.setLT = function(action) {
        $scope.plannerprof.selectedLT = action;
    };
    
    //Set the default value of the short term insurance offering state to not offered

    //$scope.plannerprof.selectedST = $scope.services[2];
    
    //Set the default value of the short term insurance offering state to selected value on dropdown
    
    $scope.plannerprof.setST = function(action) {
        $scope.plannerprof.selectedST = action;
    };
    
    //Set the default value of the tax planning offering state to not offered
    
    //$scope.plannerprof.selectedTP = $scope.services[2];
    
    //Set the default value of the tax planning offering state to selected value on dropdown
    
    $scope.plannerprof.setTP = function(action) {
        $scope.plannerprof.selectedTP = action;
    };
    
    //Set the default value of the estate planning offering state to not offered
    
    //$scope.plannerprof.selectedEP = $scope.services[2];
    
    //Set the default value of the estate planning offering state to selected value on dropdown
    
    $scope.plannerprof.setEP = function(action) {
        $scope.plannerprof.selectedEP = action;
    };
    
    //Set the default value of the estate planning offering state to selected value on dropdown
    
    $scope.plannerprof.setMA = function(action) {
        $scope.plannerprof.selectedMA = action;
    };
    
    //SET MAXIMUM VALUE PROPOSITION LENGTH
    
    //Sets the maximum number of words allowed in the value proposition text
    
    $scope.maxchar = 1250;
    
    //Watch to see if the number of characters exceeds the maximum number allowed in the short value proposition, if so freeze the text box so that they have to delete characters to continue  
    
    $scope.$watch('plannerprof.valueProp', function (newValue, oldValue) {
				if (newValue) {
					console.log(newValue.length);
					if (newValue.length > $scope.maxchar) {
					  $scope.plannerprof.valueProp = oldValue;
					}
					$scope.plannerprof.wordsleft = $scope.maxchar - newValue.length;
				}
    });

    $scope.updateBody = function (event) {
				//event.stop();
				console.log(event);
				return false;
    };
    
    //Watch to see if the number of characters exceeds the maximum number allowed in the long value proposition, if so freeze the text box so that they have to delete characters to continue      
    
    $scope.$watch('plannerprof.valueProp', function (newValue, oldValue) {
				if (newValue) {
					console.log(newValue.length);
					if (newValue.length > $scope.maxchar) {
					  $scope.plannerprof.valueProp = oldValue;
					}
					$scope.plannerprof.wordsleft = $scope.maxchar - newValue.length;
				}
    });

    //DEAL WITH GOOGLE AUTOCOMPLETE ADDRESSES
    //Restricts addresses to South Africa only
    
    $scope.options = {
        componentRestrictions: { country: 'ZA' }
    };*/

}]);

    //DIRECTIVES
    //Creates a directive that shows the current status of the planners profile

omApp.directive("plannerProfile", function() {
    return {
        restrict: 'EC',
        templateUrl: 'directives/plannerprofile.html',
        replace: true,
        scope: {
            plannerData: "="
       }
    }
});