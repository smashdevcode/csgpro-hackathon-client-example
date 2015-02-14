
(function() {
    'use strict';

    angular
        .module('app')
        .config(config);

    function config($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'Home',
                controllerAs: 'vm',
                templateUrl: 'views/home.html'
            })
            .when('/home', {
                controller: 'Home',
                controllerAs: 'vm',
                templateUrl: 'views/home.html'
            })
            .when('/projects', {
                controller: 'Projects',
                controllerAs: 'vm',
                templateUrl: 'views/projects.html'
                //resolve: {
                //    temp1: function ($q, $timeout) {
                //        var defer = $q.defer();

                //        $timeout(function () {
                //            defer.resolve();
                //        }, 2000);

                //        return defer.promise;
                //    },
                //    temp2: function ($q) {
                //        var defer = $q.defer();

                //        defer.reject();

                //        return defer.promise;
                //    }
                //}
            })
            .when('/projects/add', {
                controller: 'ProjectAdd',
                controllerAs: 'vm',
                templateUrl: 'views/project-add.html'
            })
            .when('/projects/:projectId', {
                controller: 'ProjectEdit',
                controllerAs: 'vm',
                templateUrl: 'views/project-edit.html'
            })
            .when('/login', {
                controller: 'Login',
                controllerAs: 'vm',
                templateUrl: 'views/login.html'
            })
            .when('/register', {
                controller: 'Register',
                controllerAs: 'vm',
                templateUrl: 'views/register.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
})();
