/**
 * Created by James on 8/8/2014.
 */

angular.module('app', ['ngRoute'])

    //.value('fbURL', 'https://angularjs-projects.firebaseio.com/')

    //.factory('Projects', function($firebase, fbURL) {
    //  return $firebase(new Firebase(fbURL)).$asArray();
    //})

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

    .controller('Home', function($scope) {
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
