omApp.controller('searchController', ['$scope', '$routeParams', '$rootScope','$window', '$location', 'searchquery', 'enquiry', 'reviews', '$http', 'Data','$timeout', '$anchorScroll', '$modal', '$log', function($scope, $routeParams, $rootScope, $window, $location, searchquery, enquiry, reviews, $http, Data, $timeout, $anchorScroll, $modal, $log) {

    //Create empty objects for users searches, enquiries and reviews
    
    $scope.searchquery = {};
    $scope.enquiry = {};
    $scope.reviews = {};

    $scope.fname = {};
    $scope.fname.name = "bob";
    
    //Inject the searchquery, enquiry and reviews service to ensure data persistency moving across pages in Search Controller
    
    $scope.searchquery = searchquery;
    $scope.enquiry = enquiry;
    $scope.reviews = reviews;
    
    //Create a counter that shows that the modal has already been seen    
    $scope.searchquery.updateTimesSeen = function () {
        $scope.searchquery.timesSeen = 1;
    };
    
    //Create the modal which sets has been seen to 1 when it is shown
    $scope.open = function (size) {
        $scope.searchquery.updateTimesSeen();
        var modalInstance = $modal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'pages/modalWalkthrough.html',
          controller: ['$scope', '$modalInstance', 'searchquery', function ($scope, $modalInstance, searchquery) {
            $scope.searchquery = searchquery;
            $scope.ok = function () {
                $modalInstance.close();
              };
          }],
          size: size,
          resolve: {
            items: function () {
              return $scope.items;
            }
          }
        });

        modalInstance.result.then(function (selectedItem) {
          $scope.selected = selectedItem;
        }, function () {
          $log.info('Modal dismissed at: ' + new Date());
        });
      };
    
    //Create a close function for the mailing list info bar
    $scope.closeBar = false;
    $scope.setCloseBar = function() {
        $scope.closeBar = true;
    };
    
    //Create a show bar function that shows when latitude is set and close bar is false, when close bar is true it sets to false
    $scope.showBar = false;
    $scope.setShowBar = function() {
        if(($scope.searchquery.lat > 0 || $scope.searchquery.lat < 0) && !$scope.closeBar) {
            $timeout(function(){
            $scope.showBar = true;
            },30000);
        }
        if($scope.closeBar) {
            $scope.showBar = false;
        }   
    };
    
    //Create a show bar function that shows when latitude is set and close bar is false, when close bar is true it sets to false
    
    $scope.popoutClosed = false;
    $scope.closePopout = function() {
        $scope.popoutClosed = true;
    };
    
    $scope.popoutOpen = false;
    $scope.setPopoutOpen = function() {
            if($location.path().indexOf("plannerprofilefull") && !$scope.popoutClosed) {
                $timeout(function(){
                $scope.popoutOpen = true;
                },20000);
            };
            if($scope.popoutClosed) {
                $scope.popoutOpen = false;
            }; 
    };
    
    $scope.setPopoutOpen();
    
    //GET AND POST DATA TO DATABASE
    //GET REQUESTS
    //Get planner reviews from database
    
    $scope.plannerReviews = {};
    $http.get('php/getPlannerReviews.php')
    .success(function(data) {
        $scope.plannerReviews = data;

    });
    
    //Get planner comments from database
    
    $scope.plannerComments = {};
    $http.get('php/getPlannerComments.php')
    .success(function(data) {
        $scope.plannerComments = data;

    });    
    
    //POST REQUESTS
    //Post login request
    $scope.login = {};

    $scope.doLogin = function (customer) {
        Data.post('login', {
            customer: customer
        }).then(function (results) {
            Data.toast(results);
            if (results.status == "success") {
                switch (window.location.hash) {
                case "#/plannerenquiry" + $routeParams.id:
                $location.path('/enquire' + $routeParams.id);
                break;
                case "#/plannerrating" + $routeParams.id:
                $location.path('/review' + $routeParams.id);
                break;
                };
            }
        });
    };
    
    //Post signup request    
    $scope.signup = {};
    $scope.signup = {email:'',password:'',name:''};
    $scope.signUp = function (customer) {
        Data.post('signUp', {
            customer: customer
        }).then(function (results) {
            Data.toast(results); //Display result of request through toaster
            if (results.status == "success") {
                switch (window.location.hash) {
    //If planner enquiry log in page then redirect to enquiry page
                case "#/plannerenquiry" + $routeParams.id:
                $location.path('/enquire' + $routeParams.id);
                break;
    //If planner review log in page then redirect to review page
                case "#/plannerrating" + $routeParams.id:
                $location.path('/review' + $routeParams.id);
                break;
                };
            }
        });
    };
    
    //Get logout request
    $scope.logout = function () {
        Data.get('logout').then(function (results) {
            Data.toast(results);
    //Once logged out redirect to search page
            $location.path('/search');
        });
    };
    
    //Create a variable that changes the authentication status to false, this is called when the user clicks log out, because otherwise if a user is on the search page and click log out it is not automatically hidden
    $scope.changeAuth = function () {
       $rootScope.authenticated = false;
    };
    
    //Post enquiry request to database
    $scope.enquiry={ requirements:'', usergender:'',userage:'',userjob:''};
    $scope.postEnquiry = function () {
    $http.post('php/postEnquiry.php',{ 'enquiry' : $scope.enquiry, 'userid' : $scope.userid, 'pid': $scope.pid, 'user_name': $scope.name, 'user_email': $scope.email})
            .success(function (result) {

                console.log(result);
                $location.path('/enquirythanks' + $routeParams.id);


            })
            .error(function (result) {

                console.log(result);
                $location.path('/enquire' + $routeParams.id);

            });
    };
    
    //Post search request to database
    $scope.postSearch = function () {
    $http.post('php/postSearch.php',{ 'searchquery' : $scope.searchquery, 'userid' : $scope.userid, 'pid': $scope.pid })
            .success(function (result) {

                console.log(result);

            })
            .error(function (data, status) {

                console.log(data);

            });
    };
    
    $scope.customerList = {};
    //Post mailing list sign up
    $scope.mailingListSubmit = function() {
        $http.post('php/postCustomerMailing.php',{ 'searchquery' : $scope.searchquery, 'customerList' : $scope.customerList })
                .success(function (result) {

                    console.log(result);
                    $location.path("/mailinglistthanks");

                })
                .error(function (data, status) {
    
                    console.log(data);

                });
    };  
    
    //Post unfulfilled search request to database
    $scope.postSearchUnfulfilled = function () {
    $http.post('php/postSearchUnfulfilled.php',{ 'searchquery' : $scope.searchquery })
            .success(function (result) {

                console.log(result);

            })
            .error(function (data, status) {

                console.log(data);

            });
    };    
    
    $scope.searchquery.formFilled = false;
    $scope.checkFormCompleteness = function() {
        $timeout( function(){
        if(($scope.searchquery.monthlysalary !== 0 || $scope.searchquery.lumpsum !== 0) && ($scope.searchquery.lat > 0 || $scope.searchquery.lat < 0)) {
            $scope.searchquery.formFilled = true;
        };
        },1000);
    };
    
    /*$scope.runSearchOnProfileView = function() {
        switch (window.location.hash) {
        case "#/plannerprofilefull" + $routeParams.id:
            $scope.postSearch();
        break;
        };
    };
    
    $scope.runSearchOnProfileView();*/

    //Post review request to database  

    $scope.reviews={clientgender:'', clientage:'',clientjob:'',score:'',overall:'',services:'',good:'',better:'', postRegex:/(?!.*)/, postcode:""};
    $scope.reviews.postRegex = "foo";  
    $scope.postReview = function () {    
        $http.post('php/postReview.php',{ 'reviews' : $scope.reviews, 'userid' : $scope.userid, 'pid': $scope.pid, 'name' : $scope.name })
            .success(function (result) {
                console.log(result);
                $location.path('/reviewthanks' + $routeParams.id);

            })
            .error(function (data, status) {

                console.log(data);

            });
    };

    /*//CREATE ALERT TO PROMPT USER TO COMPLETE FORM ONCE ON SEARCH PAGE
    //Define alert message
    $scope.alerts = [
    { type: 'info', msg: 'Not seeing many planners? Let us know a bit more about you in the search bar and more planners will be able to help you.' },
    ];

    //Close alert on click
    $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
    };

    //Initially show alert as false, and show after 4seconds; as long as monthly amount and lumpsum are zero (as defined on page)
    $scope.showAlert = false;
    $timeout(function(){
      $scope.showAlert = true;
    }, 4000);*/
    

    //SET VARIABLES TO A DEFAULT VALUE IN ORDER FOR THEM TO BE DEFINED THE POST REQUEST TO THE DATABASE, OTHERWISE THE POST REQUEST IS REJECTED
    //Set all search query variables to null unless they are already defined
    $scope.setSearchValueToNull = function () {
    if(!$scope.searchquery.investments) {
        $scope.searchquery.investments = false;
    };
    if(!$scope.searchquery.LT) {
        $scope.searchquery.LT = false;
    };
    if(!$scope.searchquery.ST) {
        $scope.searchquery.ST = false;
    };
    if(!$scope.searchquery.TP) {
        $scope.searchquery.TP = false;
    };
    if(!$scope.searchquery.EP) {
        $scope.searchquery.EP = false;
    };
    if(!$scope.searchquery.MA) {
        $scope.searchquery.MA = false;
    };
    if(!$scope.searchquery.english) {
        $scope.searchquery.english = false;
    };
    if(!$scope.searchquery.afrikaans) {
        $scope.searchquery.afrikaans = false;
    };
    if(!$scope.searchquery.zulu) {
        $scope.searchquery.zulu = false;
    };
    if(!$scope.searchquery.xhosa) {
        $scope.searchquery.xhosa = false;
    };
    if(!$scope.searchquery.southernsotho) {
        $scope.searchquery.southernsotho = false;
    };
    if(!$scope.searchquery.tswana) {
        $scope.searchquery.tswana = false;
    };
    if(!$scope.searchquery.northernsotho) {
        $scope.searchquery.northernsotho = false;
    };
    if(!$scope.searchquery.tsonga) {
        $scope.searchquery.tsonga = false;
    };
    if(!$scope.searchquery.venda) {
        $scope.searchquery.venda = false;
    };
    if(!$scope.searchquery.swati) {
        $scope.searchquery.swati = false;
    };
    if(!$scope.searchquery.ndebele) {
        $scope.searchquery.ndebele = false;
    };
    if($scope.searchquery.gender !== 'male' || $scope.searchquery.gender !== 'female') {
        $scope.searchquery.gender = '';
    };
    if(typeof $scope.searchquery.monthlysalary === 'undefined') {
        $scope.searchquery.monthlysalary = 0;
    };
    if(typeof $scope.searchquery.lumpsum === 'undefined') {
        $scope.searchquery.lumpsum = 0;
    };
    if(typeof $scope.searchquery.clientvalue === 'undefined') {
        $scope.searchquery.clientvalue = 0;
    };
    };
    
    $scope.setSearchValueToNull();
    
    //INSERT PLANNER PROFILE DATA    
    //Create mock planner profiles
    $scope.plannerprofiles = [];
    $http.get('php/getPlannerProfiles.php')
    .then(function(response) {   
		$scope.plannerprofiles = response.data;
                        
    //SET ATTRIBUTES OF PAGIATION DIRECTIVE ON SEARCH PAGE

    $scope.plannersFilterd=[];
    $scope.plannerprofiles.currentPage = 1; //Specifiy the first page to be shown
    $scope.plannerprofiles.itemsPerPage = 4; //Number of items to show per page
    $scope.plannerprofiles.maxSize = 5; //Number of pager buttons to show

    
    $scope.plannerprofiles.setPage = function (pageNo) {
        $scope.plannerprofiles.currentPage = pageNo;
        
    };
  
    $scope.setPageNameChange = function() {

        if($scope.searchquery.querybol) {
            $scope.plannerprofiles.setPage(1);
        }
    };
    $scope.plannerprofiles.pageChanged = function(){
       
       $anchorScroll('navbar-example');
    };
    //DEAL WITH GOOGLE AUTOCOMPLETE ADDRESSES [CURRENTLY NOT WORKING BECAUSE COMPONENT TAKEN OUT OF AUTOCOMPLETE DIRECTIVE IN ORDER THAT IT DOES NOT RESET ONCE USER GOES OFF SEARCH PAGE]
    //Restricts addresses to South Africa only
    
    $scope.options = {
        componentRestrictions: { country: 'ZA' }
    };
    
    //FUNCTIONS FOR SEARCH RANKING ALGORITHIM    
    //Function to calculate expected one year value of client
    
    $scope.client1year = function(monthly,lump) {
        if(isNaN(monthly) && isNaN(lump)) {
            return $scope.searchquery.clientvalue = 0;
        }
        else if(isNaN(monthly)) {
            return $scope.searchquery.clientvalue = (lump);
        }
        else if(isNaN(lump)) {
            return $scope.searchquery.clientvalue = (monthly*12*0.15);
        }
        else {
            return $scope.searchquery.clientvalue = ((monthly*12*0.15) + lump);
        };
    };
        
    //Function to translate broken name to full name
    
    $scope.plannerprofiles.transformName = function() {
        for (i = 0; i < $scope.plannerprofiles.length; i++) {
                $scope.plannerprofiles[i].plannerfullname = $scope.plannerprofiles[i].plannerfirstname + " " + $scope.plannerprofiles[i].plannersurname;
            };
            };
          
    $scope.plannerprofiles.transformName();

        
    //Function to translate short hand state to full name
    
    $scope.plannerprofiles.transformState = function() {
        
        for (i = 0; i < $scope.plannerprofiles.length; i++) {
            if($scope.plannerprofiles[i].addressState === 'GP') {
                $scope.plannerprofiles[i].addressState = 'Gauteng';
            }
            else if($scope.plannerprofiles[i].addressState === 'EC') {
                $scope.plannerprofiles[i].addressState = 'Eastern Cape';
            }
            else if($scope.plannerprofiles[i].addressState === 'FS') {
                $scope.plannerprofiles[i].addressState = 'Free State';
            }
            else if($scope.plannerprofiles[i].addressState === 'KZN') {
                $scope.plannerprofiles[i].addressState = 'KwaZulu-Natal';
            }
            else if($scope.plannerprofiles[i].addressState === 'LP') {
                $scope.plannerprofiles[i].addressState = 'Limpopo';
            }
            else if($scope.plannerprofiles[i].addressState === 'MP') {
                $scope.plannerprofiles[i].addressState = 'Mpumalanga';
            }
            else if($scope.plannerprofiles[i].addressState === 'NC') {
                $scope.plannerprofiles[i].addressState = 'Northern Cape';
            }
            else if($scope.plannerprofiles[i].addressState === 'NW') {
                $scope.plannerprofiles[i].addressState = 'North West';
            }
            };     
    };
        
    $scope.plannerprofiles.transformState();
        
    $scope.plannerprofiles.transformIndependence = function() {
        
        for (i = 0; i < $scope.plannerprofiles.length; i++) {
            if($scope.plannerprofiles[i].independent === '1') {
                $scope.plannerprofiles[i].independent = 'Independent';
            }
            else {
                $scope.plannerprofiles[i].independent = 'Not Independent';
            }
            };     
    };
        
    $scope.plannerprofiles.transformIndependence();
        
    $scope.plannerprofiles.transformAge = function() {

    //Change months old to years

    for (i = 0; i < $scope.plannerprofiles.length; i++) {
        $scope.plannerprofiles[i].date_of_birth2 = new Date($scope.plannerprofiles[i].date_of_birth);
    };
    };
        
    $scope.plannerprofiles.transformAge();     
        
        
    $scope.plannerprofiles.transformExp = function() {

    //Change months old to years

    for (i = 0; i < $scope.plannerprofiles.length; i++) {
        $scope.plannerprofiles[i].planner_start_date2 = new Date($scope.plannerprofiles[i].planner_start_date);
    };
    };
        
    $scope.plannerprofiles.transformExp();         
        
        
        
        
    //Function to calculate straight line distance between client and planner 
    $scope.plannerprofiles.clientDistance = function() {
        for (i = 0; i < $scope.plannerprofiles.length; i++) {
    var lat1 = $scope.plannerprofiles[i].addressLat;
    var lon1 = $scope.plannerprofiles[i].addressLong;
    var lat2 = $scope.searchquery.lat;
    var lon2 = $scope.searchquery.long;    
    var R = 6371; // km
    var dLat = (lat2-lat1)*Math.PI/180;
    var dLon = (lon2-lon1)*Math.PI/180; 
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2); 
    var c = 2 * Math.asin(Math.sqrt(a)); 
    $scope.plannerprofiles[i].distancetoclient = Math.round(R * c);
    }
    };
    
    $scope.plannerprofiles.clientDistance();
    
    //Define points to be attributed for each planner attribute
    
    $scope.scorereview = 5;    
    $scope.scoreCFP = 1;
    $scope.scoreAFP = 0.75;
    $scope.scoreRFP = 1;
    $scope.scoreFSA = 0.25;
    $scope.serviceratingInHouse = 1;
    $scope.serviceratingOutsource = 0.5;
    $scope.scorelanguages = 1;
    $scope.scoregender = 1;
    
    //Function to compare relevance score for each planner and client query  
    
    $scope.plannerprofiles.relevanceScore = function() {
    
        //Set relevance score to zero to begin with, in order to avoid undefined error
        
        for (i = 0; i < $scope.plannerprofiles.length; i++) {
            $scope.plannerprofiles[i].relevance = 0;
        };
        
        //For loop to see if Gender matches
        
        for (i = 0; i < $scope.plannerprofiles.length; i++) {
            if($scope.searchquery.gender === $scope.plannerprofiles[i].plannergender) {
                $scope.plannerprofiles[i].relevance += $scope.scoregender;
            }
            else if($scope.searchquery.gender !== $scope.plannerprofiles[i].plannergender) {
                $scope.plannerprofiles[i].relevance += 0;
            };
            };
        
        //For loop to see if planner is verified
        
        for (i = 0; i < $scope.plannerprofiles.length; i++) {
            if($scope.plannerprofiles[i].verified === '1') {
                $scope.plannerprofiles[i].relevance = $scope.plannerprofiles[i].relevance + 10;
            }
            else if($scope.plannerprofiles[i].verified === '0') {
                $scope.plannerprofiles[i].relevance = $scope.plannerprofiles[i].relevance - 10;
            };
            };

        //For loop to apply score depending on level of qualification
        
        for (i = 0; i < $scope.plannerprofiles.length; i++) {
            if($scope.plannerprofiles[i].CFP === '1') {
                $scope.plannerprofiles[i].relevance += $scope.scoreCFP;
            }
            else if($scope.plannerprofiles[i].AFP === '1') {
                $scope.plannerprofiles[i].relevance += $scope.scoreAFP;
            }
            else if($scope.plannerprofiles[i].RFP === '1') {
                $scope.plannerprofiles[i].relevance += $scope.scoreRFP;
            }
            else if($scope.plannerprofiles[i].FSA === '1') {
                $scope.plannerprofiles[i].relevance += $scope.scoreFSA;
            }
            else if($scope.plannerprofiles[i].undisclosed === '1') {
                $scope.plannerprofiles[i].relevance += 0;
            };
            };

        //For loops to rank service delivery (i.e. inhouse or outsourced) versus requirements. Function adds points for each inhouse and outsourced service offered that is required. This is different to the filter that filters out any planner that does not offer a required service.

        for (i = 0; i < $scope.plannerprofiles.length; i++) {
            if($scope.searchquery.investments === true && $scope.plannerprofiles[i].investments === 'inHouse') {
                $scope.plannerprofiles[i].relevance += $scope.serviceratingInHouse;
            }
            else if($scope.searchquery.investments === true && $scope.plannerprofiles[i].investments === 'outsource') {
                $scope.plannerprofiles[i].relevance += $scope.serviceratingOutsource;
            };
            };

        for (i = 0; i < $scope.plannerprofiles.length; i++) {
            if($scope.searchquery.LT === true && $scope.plannerprofiles[i].LT === 'inHouse') {
                $scope.plannerprofiles[i].relevance += $scope.serviceratingInHouse;
            }
            else if($scope.searchquery.LT === true && $scope.plannerprofiles[i].LT === 'outsource') {
                $scope.plannerprofiles[i].relevance += $scope.serviceratingOutsource;
            };
            };

        for (i = 0; i < $scope.plannerprofiles.length; i++) {
            if($scope.searchquery.ST === true && $scope.plannerprofiles[i].ST === 'inHouse') {
                $scope.plannerprofiles[i].relevance += $scope.serviceratingInHouse;
            }
            else if($scope.searchquery.ST === true && $scope.plannerprofiles[i].ST === 'outsource') {
                $scope.plannerprofiles[i].relevance += $scope.serviceratingOutsource;
            };
            };

        for (i = 0; i < $scope.plannerprofiles.length; i++) {
            if($scope.searchquery.EP === true && $scope.plannerprofiles[i].EP === 'inHouse') {
                $scope.plannerprofiles[i].relevance += $scope.serviceratingInHouse;
            }
            else if($scope.searchquery.EP === true && $scope.plannerprofiles[i].EP === 'outsource') {
                $scope.plannerprofiles[i].relevance += $scope.serviceratingOutsource;
            };
            };

        for (i = 0; i < $scope.plannerprofiles.length; i++) {
            if($scope.searchquery.TP === true && $scope.plannerprofiles[i].TP === 'inHouse') {
                $scope.plannerprofiles[i].relevance += $scope.serviceratingInHouse;
            }
            else if($scope.searchquery.TP === true && $scope.plannerprofiles[i].TP === 'outsource') {
                $scope.plannerprofiles[i].relevance += $scope.serviceratingOutsource;
            };
            };

        for (i = 0; i < $scope.plannerprofiles.length; i++) {
            if($scope.searchquery.MA === true && $scope.plannerprofiles[i].MA === 'inHouse') {
                $scope.plannerprofiles[i].relevance += $scope.serviceratingInHouse;
            }
            else if($scope.searchquery.MA === true && $scope.plannerprofiles[i].MA === 'outsource') {
                $scope.plannerprofiles[i].relevance += $scope.serviceratingOutsource;
            };
            };
        
        //For loops that adds average planner score to the relevance score
        
        for (i = 0; i < $scope.plannerprofiles.length; i++) {
                if($scope.plannerprofiles[i].average_rating === ''){
                    $scope.plannerprofiles[i].relevance += 0;
                }
                else {
                    $scope.plannerprofiles[i].relevance += parseFloat($scope.plannerprofiles[i].average_rating);
                };
            };

    };

    //CREATE PLANNER FILTER VARIABLE
    //SEE IF ANY LANGUAGE CHOICES MATCH PLANNER DATA
    //Function to see if any potential language boxes have been picked yet, returns 1 if so. This is used as the comparator against the planner language score. Without all profiles would be filtered when no language is selected.
    
    $scope.getreqlanguageScore = function() {
        
        if($scope.searchquery.english || $scope.searchquery.afrikaans || $scope.searchquery.zulu || $scope.searchquery.xhosa || $scope.searchquery.southernsotho || $scope.searchquery.tswana || $scope.searchquery.northernsotho || $scope.searchquery.tsonga || $scope.searchquery.venda || $scope.searchquery.swati || $scope.searchquery.ndebele) {
            $scope.searchquery.reqlanguagescore = 1;
        }
        else {
            $scope.searchquery.reqlanguagescore = 0;
        };
    };
    
    //For loop to see if languages in search and planner profile match
    
    $scope.plannerprofiles.getlanguageScore = function() {
        
    for (i = 0; i < $scope.plannerprofiles.length; i++) {
        
        if($scope.searchquery.english === true && $scope.plannerprofiles[i].english === '1') {
            $scope.plannerprofiles[i].languagescore = 1;
        }

        else if($scope.searchquery.afrikaans === true && $scope.plannerprofiles[i].afrikaans === '1') {
            $scope.plannerprofiles[i].languagescore = 1;
        }
        
        else if($scope.searchquery.zulu === true && $scope.plannerprofiles[i].zulu === '1') {
            $scope.plannerprofiles[i].languagescore = 1;
        }
        
        else if($scope.searchquery.xhosa === true && $scope.plannerprofiles[i].xhosa === '1') {
            $scope.plannerprofiles[i].languagescore = 1;
        }

        else if($scope.searchquery.southernsotho === true && $scope.plannerprofiles[i].southernsotho === '1') {
            $scope.plannerprofiles[i].languagescore = 1;
        }
    
        else if($scope.searchquery.tswana === true && $scope.plannerprofiles[i].tswana === '1') {
            $scope.plannerprofiles[i].languagescore = 1;
        }
    
        else if($scope.searchquery.northernsotho === true && $scope.plannerprofiles[i].northernsotho === '1') {
            $scope.plannerprofiles[i].languagescore = 1;
        }
        
        else if($scope.searchquery.tsonga === true && $scope.plannerprofiles[i].tsonga === '1') {
            $scope.plannerprofiles[i].languagescore = 1;
        }
        
        else if($scope.searchquery.venda === true && $scope.plannerprofiles[i].venda === '1') {
            $scope.plannerprofiles[i].languagescore = 1;
        }
 
        else if($scope.searchquery.swati === true && $scope.plannerprofiles[i].swati === '1') {
            $scope.plannerprofiles[i].languagescore = 1;
        }
        
        else if($scope.searchquery.ndebele === true && $scope.plannerprofiles[i].ndebele === '1') {
            $scope.plannerprofiles[i].languagescore = 1;
        }
        
        else {
            $scope.plannerprofiles[i].languagescore = 0;
        }
        
        };
    };
    
    //For loop to see if each planner has a score greater than or equal to required score, meaning that they speak at least one of the required languages
    
    $scope.getreqlanguagecompara = function() {
        
        //For loops to see if languages match
        for (i = 0; i < $scope.plannerprofiles.length; i++) {
        if($scope.plannerprofiles[i].languagescore >= $scope.searchquery.reqlanguagescore) {
            $scope.plannerprofiles[i].reqlanguagecompara = 1;
        }
        else {
            $scope.plannerprofiles[i].reqlanguagecompara = 0;
        };
        };
    };

    
    //SEE IF ANY SERVICE CHOICES MATCH PLANNER DATA
    //Function to see if any potential services boxes have been picked yet, returns 1 if so. This is used as the comparator against the planner service score. Without all profiles would be filtered when no service is selected.
    
    $scope.getreqserviceScore = function() {
            $scope.searchquery.reqservicescore = 0;
        if($scope.searchquery.investments) {
            $scope.searchquery.reqservicescore += 1;
        }
        else {
            $scope.searchquery.reqservicescore += 0;
        }
        if($scope.searchquery.LT) {
            $scope.searchquery.reqservicescore += 1;
        }
        else {
            $scope.searchquery.reqservicescore += 0;
        }
        if($scope.searchquery.ST) {
            $scope.searchquery.reqservicescore += 1;
        }
        else {
            $scope.searchquery.reqservicescore += 0;
        }
        if($scope.searchquery.EP) {
            $scope.searchquery.reqservicescore += 1;
        }
        else {
            $scope.searchquery.reqservicescore += 0;
        }
        if($scope.searchquery.TP) {
            $scope.searchquery.reqservicescore += 1;
        }
        else {
            $scope.searchquery.reqservicescore += 0;
        }
        if($scope.searchquery.MA) {
            $scope.searchquery.reqservicescore += 1;
        }
        else {
            $scope.searchquery.reqservicescore += 0;
        }
    };
    
    //For loop to see if services in search and planner profile match
    
    $scope.plannerprofiles.getserviceScore = function() {
    
    for (i = 0; i < $scope.plannerprofiles.length; i++) {
        
        {
            $scope.plannerprofiles[i].servicescore = 0;
        }
    };    
        
    for (i = 0; i < $scope.plannerprofiles.length; i++) {
        
        if($scope.searchquery.investments === true && $scope.plannerprofiles[i].investments !== 'notOffered') {
            $scope.plannerprofiles[i].servicescore += 1;
        }
    };
    
    for (i = 0; i < $scope.plannerprofiles.length; i++) {

        if($scope.searchquery.LT === true && $scope.plannerprofiles[i].LT !== 'notOffered') {
            $scope.plannerprofiles[i].servicescore += 1;
        }
    };
        
    for (i = 0; i < $scope.plannerprofiles.length; i++) {

        if($scope.searchquery.ST === true && $scope.plannerprofiles[i].ST !== 'notOffered') {
            $scope.plannerprofiles[i].servicescore += 1;
        }
    };
        
    for (i = 0; i < $scope.plannerprofiles.length; i++) {

        if($scope.searchquery.EP === true && $scope.plannerprofiles[i].EP !== 'notOffered') {
            $scope.plannerprofiles[i].servicescore += 1;
        }
    };
        
    for (i = 0; i < $scope.plannerprofiles.length; i++) {

        if($scope.searchquery.TP === true && $scope.plannerprofiles[i].TP !== 'notOffered') {
            $scope.plannerprofiles[i].servicescore += 1;
        }
    };
        
    for (i = 0; i < $scope.plannerprofiles.length; i++) {

        if($scope.searchquery.MA === true && $scope.plannerprofiles[i].MA !== 'notOffered') {
            $scope.plannerprofiles[i].servicescore += 1;
        }
    };
    };
    
    //For loop to see if each planner has a score greater than or equal to required score, meaning that they offer at least one of the required services
    
    $scope.getreqservicecompara = function() {
        
        //For loops to see if languages match
        for (i = 0; i < $scope.plannerprofiles.length; i++) {
            if($scope.plannerprofiles[i].servicescore >= $scope.searchquery.reqservicescore) {
                $scope.plannerprofiles[i].reqservicecompara = 1;
            }
            else {
                $scope.plannerprofiles[i].reqservicecompara = 0;
            };
        };
    };
    


    //CREATE FILTER VARIABLE FOR PLANNER PROFILES
    //Filter based on if one year client value is greater than client minimum, if distance from client is less than planner willing distance to travel, if the planner speaks the customer required language and if the planner offers the required services
    $scope.getPlannerfilter = function() {
    for (i = 0; i < $scope.plannerprofiles.length; i++) {
        if($scope.searchquery.clientvalue >= $scope.plannerprofiles[i].clientMinimum && $scope.plannerprofiles[i].distancetoclient < $scope.plannerprofiles[i].travelWilling && $scope.plannerprofiles[i].reqlanguagecompara === 1 && $scope.plannerprofiles[i].reqservicecompara === 1) {
            $scope.plannerprofiles[i].plannerfilter = true;
        }
        else {
            $scope.plannerprofiles[i].plannerfilter = false;
        };
        };
    };
    /* [Potentially not needed.]$scope.errorMessage = {};    
    $scope.getErrorMessage = function() {
    $scope.errorMessage.valueHurdle = 0;
    $scope.errorMessage.langHurdle = 0;
    $scope.errorMessage.distanceHurdle = 0;
    $scope.errorMessage.serviceHurdle = 0;
    for (i = 0; i < $scope.plannerprofiles.length; i++) {
        if($scope.searchquery.clientvalue >= $scope.plannerprofiles[i].clientMinimum) {
            $scope.errorMessage.valueHurdle += 1;
        };
        if($scope.plannerprofiles[i].distancetoclient < $scope.plannerprofiles[i].travelWilling) {
            $scope.errorMessage.distanceHurdle += 1;
        };
        if($scope.plannerprofiles[i].reqlanguagecompara === 1) {
            $scope.errorMessage.langHurdle += 1;
        };
        if($scope.plannerprofiles[i].reqservicecompara === 1) {
            $scope.errorMessage.serviceHurdle += 1;
        };
        };
    };*/

    $scope.searchquery.query = '';
    $scope.searchquery.querybol=false;
    $scope.getQuerylen = function() {
        $scope.searchquery.querylen = $scope.searchquery.query.length;
            if($scope.searchquery.querylen === 0) {
                $scope.searchquery.querybol = false;
            }
            else {
                $scope.searchquery.querybol = true;
            }
    };
    
    //Add a watcher to see if the input fields of the search query change and run the relevance and client distance functions

    $scope.$watchGroup(['searchquery.gender','searchquery.investments','searchquery.LT','searchquery.ST','searchquery.TP','searchquery.EP','searchquery.MA','searchquery.english','searchquery.afrikaans','searchquery.zulu','searchquery.xhosa','searchquery.southernsotho','searchquery.tswana','searchquery.northernsotho','searchquery.tsonga','searchquery.venda','searchquery.swati','searchquery.ndebele','searchquery.address.name','searchquery.monthlysalary','searchquery.lumpsum','searchquery.query'],function(){
                $scope.client1year(searchquery.monthlysalary,searchquery.lumpsum);
                $scope.getreqlanguageScore();
                $scope.plannerprofiles.getlanguageScore();
                $scope.getreqlanguagecompara();
        
                $scope.getreqserviceScore();
                $scope.plannerprofiles.getserviceScore();
                $scope.getreqservicecompara();
        
                $scope.plannerprofiles.relevanceScore();
                $scope.plannerprofiles.clientDistance();
        
                $scope.getPlannerfilter();
                $scope.getQuerylen();
                $scope.setPageNameChange();
                $scope.checkFormCompleteness();
                $scope.setShowBar();
                /*$scope.getErrorMessage();*/
                $scope.checkAddressCompleted();
    });
    
    //Create a variable that stores the value of the route parameters that allows people to see the full profile of only one planner, it is used to filter the page data to the planner.
    
    $scope.pid = $routeParams.id;
    $scope.plannerprofiles.pid = $routeParams.id;
 
    });
    
    //Create a function that tracks whether the sidebar in the search page is open or not
    
    $scope.sidebarOpen = false;
    $scope.toggle = function() {
        $scope.sidebarOpen = !$scope.sidebarOpen;
    }; 

  
    //Create a function that tracks whether the full review in the review page is open or not
    
    $scope.fullReviewOpen = false;
    $scope.toggleReview = function() {
        $scope.fullReviewOpen = !$scope.fullReviewOpen;
    };   
    
    //Create a watch function that gets the screen width, this is used to determine the sidebar display to be shown [currently not working entirely automatically, currently only when a user updates a field]
    
    $scope.$watch(function()
        {
        return $window.innerWidth;
        }, 
        function(value) {
        $scope.searchquery.windowWidth = value;
       });
    
    $scope.isCollapsed = true;
    
    //SET MAXIMUM LENGTH OF TEXT INPUTS
    //Sets the maximum number of words allowed in the value proposition text
    
    $scope.maxchar = 1000;
    
    //Watch to see if the number of characters exceeds the maximum number allowed in the enquiry customer requirements, if so freeze the text box so that they have to delete characters to continue  
    
    $scope.$watch('enquiry.requirements', function (newValue, oldValue) {
				if (newValue) {
					if (newValue.length > $scope.maxchar) {
					  $scope.enquiry.requirements = oldValue;
					}
					$scope.enquiry.wordsleft = $scope.maxchar - newValue.length;
				}
    });

    //Watch to see if the number of characters exceeds the maximum number allowed in the overall review, if so freeze the text box so that they have to delete characters to continue  
    
    $scope.$watch('reviews.overall', function (newValue, oldValue) {
				if (newValue) {
					if (newValue.length > $scope.maxchar) {
					  $scope.reviews.overall = oldValue;
					}
					$scope.reviews.overallwordsleft = $scope.maxchar - newValue.length;
				}
    });    
    
    //Watch to see if the number of characters exceeds the maximum number allowed in the services rendered, if so freeze the text box so that they have to delete characters to continue  
    
    $scope.$watch('reviews.services', function (newValue, oldValue) {
				if (newValue) {
					if (newValue.length > $scope.maxchar) {
					  $scope.reviews.services = oldValue;
					}
					$scope.reviews.serviceswordsleft = $scope.maxchar - newValue.length;
				}
    });
    
    //Watch to see if the number of characters exceeds the maximum number allowed in the what did the planner do well text box, if so freeze the text box so that they have to delete characters to continue  
    
    $scope.$watch('reviews.good', function (newValue, oldValue) {
				if (newValue) {
					if (newValue.length > $scope.maxchar) {
					  $scope.reviews.good = oldValue;
					}
					$scope.reviews.goodwordsleft = $scope.maxchar - newValue.length;
				}
    });
    
    //Watch to see if the number of characters exceeds the maximum number allowed in the what could the planner have done well text box, if so freeze the text box so that they have to delete characters to continue  
    
    $scope.$watch('reviews.better', function (newValue, oldValue) {
				if (newValue) {
					if (newValue.length > $scope.maxchar) {
					  $scope.reviews.better = oldValue;
					}
					$scope.reviews.betterwordsleft = $scope.maxchar - newValue.length;
				}
    });

    
    //Set the necessary parameters for the star rating functionality    
    $scope.rate = 0;
    $scope.max = 5;
    $scope.isReadonly = false;
    
    //Set the star rating when a user hovers over the star
    $scope.hoveringOver = function(value) {
    $scope.overStar = value;
    };
    
        //Set the necessary parameters for the star rating functionality    
    $scope.plannerprofiles.rate = 0;
    $scope.plannerprofiles.max = 5;
    $scope.plannerprofiles.isReadonly = false;
    
    //Set the star rating when a user hovers over the star
    $scope.plannerprofiles.hoveringOver = function(value) {
        $scope.plannerprofiles.overStar = value;
    };
   
  
    //Manually load share this buttons for thanks pages
    $scope.loadShareThis = function() {
        stButtons.makeButtons();
    };
    
  $scope.myInterval = 1500;
  $scope.slides = [
    {
      image: 'psg_logo'
    },
    {
      image: 'liberty_logo'
    },
    {
      image: 'oldMutual_logo'
    },
    {
      image: 'investec_logo'
    },
    {
      image: 'hollard_logo'
    },
    {
      image: 'discovery_logo'
    },
    {
      image: 'sanlam_logo'
    },
    {
      image: 'stanlib_logo'
    }
  ];
    
    $scope.linkButton = function(path) {
        $location.path(path);
    };
    
    $scope.requestMeeting = function() {
        $location.path('/enquire' + $scope.plannerprofiles.pid);
    };
    
    $scope.searchquery.addressCompleted = false;
    $scope.checkAddressCompleted = function() {
        if($scope.searchquery.lat > 0 || $scope.searchquery.lat < 0) {
            $scope.searchquery.addressCompleted = true;
        };
    };    
    
}]);



//Create a directive that displays the shortend planner profiles in the search query

omApp.directive("plannerProfileSearch", function() {
    return {
        restrict: 'EC',
        templateUrl: 'directives/plannerprofilesearch.html',
        replace: true,
        scope: {
            plannerData: "=",
            searchData: "=",
            clientValue: "&",
            postSearchUnfulfilled: "&"
            
       }
    }
});

//Create a directive that shows a search sidebar when the screen is large

omApp.directive("searchSidebarLarge", function() {
    return {
        restrict: 'EC',
        templateUrl: 'directives/searchsidebarlarge.html',
        replace: true,
        scope: {
            searchData: "=",
            toggle: "&",
            sidebarOpen: "=",
            plannerData: "="

       }
    }
});

//Create a directive that shows a search sidebar when the screen is smaller

omApp.directive("searchSidebarSmall", function() {
    return {
        restrict: 'EC',
        templateUrl: 'directives/searchsidebarsmall.html',
        replace: true,
        scope: {
            searchData: "=",
            toggle: "&",
            sidebarOpen: "=",
            plannerData: "="
       }
    }
});

omApp.directive('disableAnimation', ['$animate',function($animate){
    return {
        restrict: 'A',
        link: function($scope, $element, $attrs){
            $attrs.$observe('disableAnimation', function(value){
                $animate.enabled(!value, $element);
            });
        }
    }
    }]);
