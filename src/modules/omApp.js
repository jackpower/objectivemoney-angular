//Module
var omApp = angular.module('omApp',['ngRoute', 'ui.bootstrap', 'ui.slider', 'vsGoogleAutocomplete', 'ngAnimate', 'ngMessages', 'toaster', 'ngResource', 'angulartics', 'angulartics.google.analytics','metatags', 'googleExperiments', 'angularLoad']);

//Routing
omApp.config(['$routeProvider','MetaTagsProvider', 'googleExperimentsProvider', '$locationProvider', function ($routeProvider, MetaTagsProvider, googleExperimentsProvider) {
    
    googleExperimentsProvider.configure({
        experimentId: 'PdoI0OY_R-qbuWM3p-aLvQ'
    });
        
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
    
    .when('/stock-versus-property-investing_planner-reply', {
        templateUrl: 'pages/blog/stock-versus-property-investing_planner-reply.html',
        controller: 'resourcesController'
    })     

    .when('/what-you-need-to-know-about-robo-advice', {
        templateUrl: 'pages/blog/what-you-need-to-know-about-robo-advice.html',
        controller: 'resourcesController'
    }) 
    
    .when('/what-you-need-to-know-about-robo-advice_planner-reply', {
        templateUrl: 'pages/blog/what-you-need-to-know-about-robo-advice_planner-reply.html',
        controller: 'resourcesController'
    }) 
    
    .when('/6-things-that-online-data-tells-you-about-financial-planning', {
        templateUrl: 'pages/blog/6-things-that-online-data-tells-you-about-financial-planning.html',
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
    
    .when('/mailinglist', {
        templateUrl: 'pages/mailinglistsignup.html',
        controller: 'searchController'
    })    
    
    .when('/mailinglistthanks', {
        templateUrl: 'pages/mailinglistthanks.html',
        controller: 'searchController'
    })    
    
    .when('/tester', {
        templateUrl: 'pages/tester.html',
        controller: 'searchController'
    }) 
    
    .otherwise({
        redirectTo: '/'
    });
    
    MetaTagsProvider
    
    .when('/', {
        title: 'Compare Reviewed Financial Planners | Objective Money',
        description:'Objective Money Helps You To Find Your Perfect Financial Planner | Compare Verified, Customer Reviewed Planners In Your Area and Get Access To Great Information On How To Choose A Planner',
        robots: 'index, follow'
    })         
    
    .when('/search', {
        title: 'Search Reviewed Financial Planners | Objective Money',
        description:'Search For Verified, Customer Reviewed Planners In Your Area',
        robots: 'index, follow'
    })

    .when('/resources', {
        title: 'How To Choose A Planner And General Investing Information',
        description:'Access Great Information On How To Choose A Planner And General Investing Information',
        robots: 'index, follow'
    })

    .when('/how-to-ensure-your-planners-not-a-scammer', {
        title: 'Ensure Your Planner Is Not A Scammer | Objective Money',
        description:'Learn Tried And Tested Techniques To Determine If Your Planner Is Credible',
        robots: 'index, follow'
    })
    
    .when('/what-is-the-value-of-a-financial-planner', {
        title: 'Is A Financial Planner Worth The Fees | Objective Money',
        description:'Why Should I Get A Financial Planner And What Do They Actually Do For Me? Find Out What The Value Of A Financial Planner Is',
        robots: 'index, follow'
    })
    
    .when('/choose-your-planner-like-you-would-a-friend-not-a-toothbrush', {
        title: 'Make Sure You Like Your Financial Planner | Objective Money',
        description:'Find Out How You Can Decide If A Planner Is The Right Fit For You',
        robots: 'index, follow'
    })
    
    .when('/introduction-to-financial-markets', {
        title: 'An Introduction To Financial Markets | Objective Money',
        description:'Looking To Get Into Investing? Read This Introduction To Financial Markets',
        robots: 'index, follow'
    })
    
    .when('/what-fees-does-a-financial-planner-charge', {
        title: 'How Much Does A Planner Charge | Objective Money',
        description:'How Much Does A Financial Planner Charge? This Article Explains A Financial Planners Fee Structure',
        robots: 'index, follow'
    })
    
    .when('/what-is-an-independent-financial-planner', {
        title: 'What Is An Independent Financial Planner | Objective Money',
        description:'This Article Explains The Differences Between Independent And Tied Planners And Why It Matters To You',
        robots: 'index, follow'
    })
    
    .when('/stock-versus-property-investing', {
        title: 'Stock Market Or Property Investing | Objective Money',
        description:'Deciding Between Stock Market And Property Investing? This Article Explains The Key Differences Between Them',
        robots: 'index, follow'
    })    
    
    .when('/stock-versus-property-investing_planner-reply', {
        title: 'Stock Market Or Property Investing | Objective Money',
        description:'Shaun Gravett, a qualified CFP professional, gives his views on property versus stock market investing',
        robots: 'index, follow'
    })      

    .when('/what-you-need-to-know-about-robo-advice', {
        title: 'Introduction To Robo Advice | Objective Money',
        description:'Robo-advice will be coming to South Africa soon. Dont get caught up in the hype, this article explains what robo-advice is and is not',
        robots: 'index, follow'
    }) 
    
    .when('/what-you-need-to-know-about-robo-advice_planner-reply', {
        title: 'Introduction To Robo Advice | Objective Money',
        description:'Shaun Gravett, a qualified CFP professional, provides his views on the advantages and disadvantages of robo-advisors for average South Africans',
        robots: 'index, follow'
    }) 
    
    .when('/6-things-that-online-data-tells-you-about-financial-planning', {
        title: 'What The Internet Tells Us About Financial Planning | Objective Money',
        description:'Objective Money scoured the Google and Twitter databases to see what they could tell us about financial planning in South Africa. For starters, we found 6 interesting facts.',
        robots: 'index, follow'
    }) 
    
    .when('/login', {
        title: 'Financial Planner Registration | Objective Money',
        description:'',
        robots: 'noindex, nofollow'
    })    
    
    .when('/signupthanks', {
        title: 'Thanks For Signing Up | Objective Money',
        description:'',
        robots: 'noindex, nofollow'
    })
    
    .when('/plannerprofilefull:id', {
        title: 'Detailed Financial Planner Profile | Objective Money',
        description:'Get All Of The Details Of Your Chosen Financial Planner | Request A Meeting Or Leave A Review',
        robots: 'index, follow'
    })
    
    .when('/plannerenquiry:id', {
        title: 'Request A Meeting With A Planner | Objective Money',
        description:'',
        robots: 'noindex, nofollow'
    })
    
    .when('/enquire:id', {
        title: 'Request A Meeting With A Planner | Objective Money',
        description:'',
        robots: 'noindex, nofollow'
    })   
    
    .when('/enquirythanks:id', {
        title: 'Request A Meeting With A Planner | Objective Money',
        description:'',
        robots: 'noindex, nofollow'
    })  
    
    .when('/plannerrating:id', {
        title: 'Review A Financial Planner | Objective Money',
        description:'',
        robots: 'noindex, nofollow'
    })
    
    .when('/reviewthanks:id', {
        title: 'Review A Financial Planner | Objective Money',
        description:'',
        robots: 'noindex, nofollow'
    })  
    
    .when('/review:id', {
        title: 'Review A Financial Planner | Objective Money',
        description:'',
        robots: 'noindex, nofollow'
    })
    
    .when('/plannerreviews:id', {
        title: 'Review A Financial Planner | Objective Money',
        description:'',
        robots: 'noindex, nofollow'
    })
    
    .when('/mailinglist', {
        title: 'Get Information On Financial Planning | Objective Money',
        description:'Get The Latest News On Financial Planners In Your Area',
        robots: 'index, follow'
    })    
    
    .when('/mailinglistthanks', {
        title: 'Get Information On Financial Planning | Objective Money',
        description:'',
        robots: 'index, follow'
    })      
    
    .otherwise({
        title: 'Compare Reviewed Financial Planners | Objective Money',
        description:'Objective Money Helps You To Find Your Perfect Financial Planner | Compare Verified, Customer Reviewed Planners In Your Area and Get Access To Great Information On How To Choose A Planner',
        robots: 'index, follow'
    });    

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
        if(months >= 0){
           return months;
        }
        if(months < 0){
           return 12 - Math.abs(months);
        }   
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
omApp.run(['$routeParams','$rootScope','$location','Data', function ($routeParams, $rootScope, $location, Data) {
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
    }]);

omApp.run(['MetaTags', function(MetaTags){
    MetaTags.initialize();
}]);