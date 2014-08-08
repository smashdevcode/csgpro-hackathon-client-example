/**
 * Created by James on 8/8/2014.
 */

angular.module('api', [])

    .controller('Repository', function($scope, $http) {

        $scope.getUser = function () {
            console.log('hello from Repository.getUser()!');
        };

    });

angular.module('app', ['ngRoute','api'])

    .value('apiURL', 'https://csgprohackathonapi.azurewebsites.net/api/')

    .factory('API', function($http, apiURL) {
        return new function () {
            var self = this;

            self.getUser = function (username, password, success) {

                var authString = btoa(username + ':' + password);

                $http({
                    headers: {
                        'Authorization': 'Basic ' + authString
                    },
                    method: 'GET',
                    url: apiURL + 'users'
                    }).
                    success(function(data, status, headers, config) {
                        // this callback will be called asynchronously
                        // when the response is available
                        console.log('success');
                        if (success) {
                            success(data);
                        }
                    }).
                    error(function(data, status, headers, config) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                        console.log(status);
                    });

            };
        };
    })

    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                controller:'Home',
                templateUrl:'views/home.html'
            })
            .when('/home', {
                controller:'Home',
                templateUrl:'views/home.html'
            })
            .when('/projects', {
                controller:'Projects',
                templateUrl:'views/projects.html'
            })
            .when('/register', {
                controller:'Register',
                templateUrl:'views/register.html'
            })
            // .when('/edit/:projectId', {
            //   controller:'EditCtrl',
            //   templateUrl:'detail.html'
            // })
            // .when('/new', {
            //   controller:'CreateCtrl',
            //   templateUrl:'detail.html'
            // })
            .otherwise({
                redirectTo:'/'
            });
    })

    .controller('Home', function($scope, API) {
        var user = API.getUser('jennyc', 'password', function (user) {
            console.log(user);

            if (user) {
                $scope.name = user.Name;
            }
        });
    })

    .controller('Projects', function($scope) {
    })

    .controller('Register', function($scope) {
    })

//    .controller('CreateCtrl', function($scope, $location) {
//        // $scope.save = function() {
//        //     Projects.$add($scope.project).then(function(data) {
//        //         $location.path('/');
//        //     });
//        // };
//    })

//    .controller('EditCtrl',
//    function($scope, $location, $routeParams) {
//        // var projectId = $routeParams.projectId,
//        //     projectIndex;
//
//        // $scope.projects = Projects;
//        // projectIndex = $scope.projects.$indexFor(projectId);
//        // $scope.project = $scope.projects[projectIndex];
//
//        // $scope.destroy = function() {
//        //     $scope.projects.$remove($scope.project).then(function(data) {
//        //         $location.path('/');
//        //     });
//        // };
//
//        // $scope.save = function() {
//        //     $scope.projects.$save($scope.project).then(function(data) {
//        //        $location.path('/');
//        //     });
//        // };
//    });
