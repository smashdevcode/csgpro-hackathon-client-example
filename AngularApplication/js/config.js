
(function() {
    'use strict';

    angular
        .module('app')
        .config(config);

    function config($routeProvider, $mdThemingProvider) {
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
                // TODO remove
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
                controller: 'ProjectAddEdit',
                controllerAs: 'vm',
                templateUrl: 'views/project-add-edit.html'
            })
            .when('/projects/:projectId', {
                controller: 'ProjectAddEdit',
                controllerAs: 'vm',
                templateUrl: 'views/project-add-edit.html'
            })
            .when('/login', {
                controller: 'Login',
                controllerAs: 'vm',
                templateUrl: 'views/login.html',
                requireLogin: false
            })
            .when('/register', {
                controller: 'Register',
                controllerAs: 'vm',
                templateUrl: 'views/register.html',
                requireLogin: false
            })
            .otherwise({
                redirectTo: '/'
            });

        //$mdThemingProvider.theme('default')
        //    .primaryPalette('blue-grey')
        //    .accentPalette('yellow')
        //    .warnPalette('red')
        //    .backgroundPalette('grey');
    }
})();
