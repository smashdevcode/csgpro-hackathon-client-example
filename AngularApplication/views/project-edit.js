
(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProjectEdit', ProjectEdit);

    ProjectEdit.$inject = ['$location', '$routeParams', 'api', 'auth'];

    function ProjectEdit($location, $routeParams, api, auth) {
        var vm = this;

        vm.project = {};
        vm.save = save;

        activate();

        function activate() {
            // TODO need to provide a way for the user to login
            if (!auth.isAuthenticated) {
                auth.login('jennyc', 'password');
            }

            api.getProject($routeParams.projectId, function (project) {
                vm.project = project;
            });
        }

        function save() {

            // TODO need to handle errors

            api.updateProject(vm.project, function () {
                $location.path('/projects');
            });
        }
    }
})();
