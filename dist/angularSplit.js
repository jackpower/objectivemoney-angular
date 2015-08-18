/* angular-load.js / v0.3.0 / (c) 2014, 2015 Uri Shaked / MIT Licence */

(function() {
    'use strict';

    angular.module('angularLoad', [])
        .service('angularLoad', ['$document', '$q', '$timeout', function($document, $q, $timeout) {

            function loader(createElement) {
                var promises = {};

                return function(url) {
                    if (typeof promises[url] === 'undefined') {
                        var deferred = $q.defer();
                        var element = createElement(url);

                        element.onload = element.onreadystatechange = function(e) {
                            $timeout(function() {
                                deferred.resolve(e);
                            });
                        };
                        element.onerror = function(e) {
                            $timeout(function() {
                                deferred.reject(e);
                            });
                        };

                        promises[url] = deferred.promise;
                    }

                    return promises[url];
                };
            }

            /**
             * Dynamically loads the given script
             * @param src The url of the script to load dynamically
             * @returns {*} Promise that will be resolved once the script has been loaded.
             */
            this.loadScript = loader(function(src) {
                var script = $document[0].createElement('script');

                script.src = src;

                $document[0].body.appendChild(script);
                return script;
            });

            /**
             * Dynamically loads the given CSS file
             * @param href The url of the CSS to load dynamically
             * @returns {*} Promise that will be resolved once the CSS file has been loaded.
             */
            this.loadCSS = loader(function(href) {
                var style = $document[0].createElement('link');

                style.rel = 'stylesheet';
                style.type = 'text/css';
                style.href = href;

                $document[0].head.appendChild(style);
                return style;
            });
        }]);
})();

angular.module('googleExperiments', ['angularLoad']);
angular.module('googleExperiments').provider(
    'googleExperiments', [function googleExperimentsProvider() {
        var variation;
        this.configure = function(conf) {
            this.config = conf;
        };

        this.$get = ['$q', '$timeout', 'angularLoad', '$analytics', function($q, $timeout, angularLoad, $analytics) {
            var variationDeferred = $q.defer();

            angularLoad.loadScript('//www.google-analytics.com/cx/api.js?experiment=' + this.config.experimentId).then(function() {
                chosenVariation = cxApi.chooseVariation();
                $analytics.eventTrack('jumbotronChange', {  category: 'category', label: 'label' });
                variationDeferred.resolve(chosenVariation);
            }).catch(function() {
                //error loading script
            });

            return {
                getVariation: function() {
                    return variationDeferred.promise;
                }
            };
        }];
    }]
);

angular.module('googleExperiments').directive(
    'variation', ['googleExperiments', function(googleExperiments) {
        return function(scope, element, attr) {
            element.addClass('ng-cloak');
            scope.$watch(attr.variation, function googleExperimentsVariationWatchAction(value) {
                googleExperiments.getVariation().then(function(variation) {
                    /* as opposed to here where this can get called multiple times */
                    if (variation == value) {
                        element.removeClass('ng-cloak');
                        element.removeClass('ng-hide');
                    } else {
                        element.addClass('ng-hide');
                    }
                });
            });
        };
    }]
);
