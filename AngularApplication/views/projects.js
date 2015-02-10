
(function() {
    'use strict';

    angular
        .module('app')
        .controller('Projects', Projects);

    Projects.$inject = ['$location', 'api', 'auth'];

    function Projects($location, api, auth) {
        var vm = this;

        vm.projects = [];
        vm.add = add;
        vm.edit = edit;

        activate();

        function activate() {
            // TODO need to provide a way for the user to login
            if (!auth.isAuthenticated) {
                auth.login('jennyc', 'password');
            }

            api.getProjects(function (projects) {
                vm.projects = projects;
            });
        }

        function add() {
            $location.path('/projects/add');
        }

        function edit(projectId) {
            $location.path('/projects/' + projectId);
        }
    }
})();
