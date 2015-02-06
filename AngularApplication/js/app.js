
angular.module('api', [])

    .controller('Repository', function ($scope, $http) {

        $scope.getUser = function () {
            console.log('hello from Repository.getUser()!');
        };

    });

angular.module('app', ['ngRoute', 'api'])

    //.value('apiURL', 'http://localhost:57214/api/')
    .value('apiURL', 'https://csgprohackathonapi.azurewebsites.net/api/')

    .factory('auth', function () {
        return new function () {
            var self = this;

            self.isAuthenticated = false;
            self.username = null;
            self.password = null;

            self.login = function (username, password) {

                // JCTODO need to authenticate the user

                self.isAuthenticated = true;
                self.username = username;
                self.password = password;
            };

            self.logout = function () {
                self.isAuthenticated = false;
                self.username = null;
                self.password = null;
            };
        };
    })

    .factory('API', function ($http, apiURL, auth) {
        return new function () {
            var self = this;

            // JCTODO need to check within each function if the user is logged

            self.getUser = function (success) {
                self.http('GET', 'users', null, success);
            };

            self.getProjects = function (success) {
                self.http('GET', 'projects', null, success);
            };

            self.getProject = function (projectId, success) {
                self.http('GET', 'projects/' + projectId, null, success);
            };

            self.addProject = function (project, success) {
                self.http('POST', 'projects', project, success);
            };

            self.updateProject = function (project, success) {
                self.http('PUT', 'projects/' + project.ProjectId, project, success);
            };

            self.http = function (method, action, data, success) {

                var authString = btoa(auth.username + ':' + auth.password);

                $http({
                    headers: {
                        'Authorization': 'Basic ' + authString
                    },
                    method: method,
                    url: apiURL + action,
                    data: data
                }).
                    success(function (data, status, headers, config) {
                        // this callback will be called asynchronously
                        // when the response is available
                        console.log('success');

                        if (success) {
                            success(data);
                        }
                    }).
                    error(function (data, status, headers, config) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                        console.log(status);

                        // JCTODO display error message???
                    });

            };

        };
    })

    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'Home',
                templateUrl: 'views/home.html'
            })
            .when('/home', {
                controller: 'Home',
                templateUrl: 'views/home.html'
            })
            .when('/projects', {
                controller: 'Projects',
                templateUrl: 'views/projects.html',
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
                templateUrl: 'views/project-add.html'
            })
            .when('/projects/:projectId', {
                controller: 'ProjectEdit',
                templateUrl: 'views/project-edit.html'
            })
            .when('/register', {
                controller: 'Register',
                templateUrl: 'views/register.html'
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
                redirectTo: '/'
            });
    })

    .controller('Home', function ($scope, API, auth) {

        // JCTODO need to provide a way for the user to login
        if (!auth.isAuthenticated) {
            auth.login('jennyc', 'password');
        }

        API.getUser(function (user) {
            console.log(user);

            if (user) {
                $scope.name = user.Name;
            }
        });
    })

    .controller('Projects', function ($scope, $location, API, auth) {
        var self = this;

        // JCTODO need to provide a way for the user to login
        if (!auth.isAuthenticated) {
            auth.login('jennyc', 'password');
        }

        API.getProjects(function (projects) {
            $scope.projects = projects;
        });

        $scope.add = function () {
            $location.path('/projects/add');
        };

        $scope.edit = function (projectId) {
            $location.path('/projects/' + projectId);
        };
    })

    .controller('ProjectAdd', function ($scope, $location, API, auth) {
        var self = this;

        // JCTODO need to provide a way for the user to login
        if (!auth.isAuthenticated) {
            auth.login('jennyc', 'password');
        }

        $scope.project = {};

        $scope.save = function () {
            var project = $scope.project;

            // Add "Default" role and task.
            project.projectRoles = [
                { name: 'Default' }
            ];
            project.projectTasks = [
                { name: 'Default' }
            ];

            // JCTODO need to handle errors

            API.addProject($scope.project, function () {
                $location.path('/projects');
            });
        };
    })

    .controller('ProjectEdit', function ($scope, $location, $routeParams, API, auth) {
        var self = this;

        // JCTODO need to provide a way for the user to login
        if (!auth.isAuthenticated) {
            auth.login('jennyc', 'password');
        }

        API.getProject($routeParams.projectId, function (project) {
            $scope.project = project;
        });

        $scope.save = function () {

            // JCTODO need to handle errors

            API.updateProject($scope.project, function () {
                $location.path('/projects');
            });
        };
    })

    .controller('Register', function ($scope) {
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
