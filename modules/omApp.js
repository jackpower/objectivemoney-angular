//Module
var omApp = angular.module('omApp',['ngRoute', 'ui.bootstrap', 'ui.slider', 'vsGoogleAutocomplete', 'ngAnimate', 'ngMessages', 'toaster', 'ngResource', 'angulartics', 'angulartics.google.analytics','ng-optimizely']);

//Routing
omApp.config(['$routeProvider', function ($routeProvider) {
    
    $routeProvider
    
    .when('/', {
        templateUrl: 'pages/home.html',
        controller: 'searchController'
    })    
    
    .when('/search', {
        templateUrl: 'pages/search.html',
        controller: 'searchController'
    })

    .when('/resources', {
        templateUrl: 'pages/resources.html',
        controller: 'resourcesController'
    })

    .when('/how-to-ensure-your-planners-not-a-scammer', {
        templateUrl: 'pages/blog/how-to-ensure-your-planner-not-a-scammer.html',
        controller: 'resourcesController'
    })
    
    .when('/what-is-the-value-of-a-financial-planner', {
        templateUrl: 'pages/blog/what-is-the-value-of-a-financial-planner.html',
        controller: 'resourcesController'
    })
    
    .when('/choose-your-planner-like-you-would-a-friend-not-a-toothbrush', {
        templateUrl: 'pages/blog/choose-your-planner-like-you-would-a-friend-not-a-toothbrush.html',
        controller: 'resourcesController'
    })
    
    .when('/introduction-to-financial-markets', {
        templateUrl: 'pages/blog/introduction-to-financial-markets.html',
        controller: 'resourcesController'
    })
    
    .when('/what-fees-does-a-financial-planner-charge', {
        templateUrl: 'pages/blog/what-fees-does-a-financial-planner-charge.html',
        controller: 'resourcesController'
    })
    
    .when('/what-is-an-independent-financial-planner', {
        templateUrl: 'pages/blog/what-is-an-independent-financial-planner.html',
        controller: 'resourcesController'
    })
    
    .when('/stock-versus-property-investing', {
        templateUrl: 'pages/blog/5-Facts-You-Need-To-Know-Before-Deciding-Between-Stock-Market-and-Property-Investment.html',
        controller: 'resourcesController'
    })    

    .when('/what-you-need-to-know-about-robo-advise', {
        templateUrl: 'pages/blog/what-you-need-to-know-about-robo-advise.html',
        controller: 'resourcesController'
    }) 
    
    .when('/login', {
        templateUrl: 'pages/plannerlogin.html',
        controller: 'plannerRegController'
    })    
    
    .when('/signupthanks', {
        templateUrl: 'pages/signupthanks.html',
        controller: 'plannerRegController'
    })
    
    .when('/plannerprofilefull:id', {
        templateUrl: 'pages/plannerprofilefull.html',
        controller: 'searchController'
    })
    
    .when('/plannerenquiry:id', {
        templateUrl: 'pages/plannerenquiry.html',
        controller: 'searchController'
    })
    
    .when('/enquire:id', {
        templateUrl: 'pages/enquire.html',
        controller: 'searchController'
    })   
    
    .when('/enquirythanks:id', {
        templateUrl: 'pages/enquirythanks.html',
        controller: 'searchController'
    })  
    
    .when('/plannerrating:id', {
        templateUrl: 'pages/plannerrating.html',
        controller: 'searchController'
    })
    
    .when('/fullplannerreviews:id', {
        templateUrl: 'pages/fullplannerreviews.html',
        controller: 'searchController'
    })
    
    .when('/reviewthanks:id', {
        templateUrl: 'pages/reviewthanks.html',
        controller: 'searchController'
    })  
    
    .when('/review:id', {
        templateUrl: 'pages/review.html',
        controller: 'searchController'
    })
    
    .when('/plannerreviews:id', {
        templateUrl: 'pages/plannerreviews.html',
        controller: 'searchController'
    }) 
    
    .when('/userlogin', {
        templateUrl: 'pages/userlogin.html',
        controller: 'searchController'
    }) 
    
    .when('/userregister', {
        templateUrl: 'pages/userregister.html',
        controller: 'searchController'
    })
    
    .when('/mailinglist', {
        templateUrl: 'pages/mailinglistsignup.html',
        controller: 'searchController'
    })    
    
    .when('/mailinglistthanks', {
        templateUrl: 'pages/mailinglistthanks.html',
        controller: 'searchController'
    })      
    
    .otherwise({
        redirectTo: '/'
    });

}]);


    omApp.run(['optimizely', function(optimizely) {
  optimizely.loadProject('3207421324');
    }]);
        
        
    //Create a capitalisation filter that turns a string lower case and then capitalises the first letter of the string
omApp.filter('capitalize', function() {
    
    return function(input, all) {
      return (!!input) ? input.replace(/([^\W_]+[^\s-]*) */g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';
    }

});

    //Create a filter that calculates the difference between a given date and today, this is used for the age and years experience variable in the planner sign up
omApp.filter('ageFilter', function() {
     function calculateAge(day) { // day is a date
         var ageDifMs = Date.now() - day.getTime();
         var ageDate = new Date(ageDifMs); // miliseconds from epoch
         return Math.abs(ageDate.getUTCFullYear() - 1970);
     }
     function monthDiff(d1, d2) {
       if (d1 < d2){
        var months = d2.getMonth() - d1.getMonth();
        return months <= 0 ? 0 : months;
       }
       return 0;
     }       
     return function(date) { 
           var age = calculateAge(date);
           if (age === 0)
               return monthDiff(date, new Date()) + ' months';
           if (age === 1)
               return age  + ' year';
           return age  + ' years';
     }; 
});

    //Run a function that checks on every route change whether a user is logged in and if so set the credentials for the session. If a user is not logged in and attempts to go to the review or enquire page they are automatically routed to the relevant page. 
omApp.run(function ($routeParams, $rootScope, $location, Data) {
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            $rootScope.authenticated = false;
            Data.get('session').then(function (results) {
                if (results.userid) {
                    $rootScope.authenticated = true;
                    $rootScope.userid = results.userid;
                    $rootScope.name = results.name;
                    $rootScope.email = results.email;
                }
                if ( $rootScope.authenticated == false ) {
                    if ( next.templateUrl == "pages/enquire.html") {
                        $location.path( "/plannerenquiry" + $routeParams.id);
                    }
                    if ( next.templateUrl == "pages/review.html") {
                        $location.path( "/plannerrating" + $routeParams.id);
                    }
                    else {
                    }
                }
                });
        });
    });