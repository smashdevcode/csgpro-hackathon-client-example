
(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProjectAdd', ProjectAdd);

    ProjectAdd.$inject = ['$location', 'api', 'auth'];

    function ProjectAdd($location, api, auth) {
        var vm = this;

        vm.project = {};
        vm.save = save;

        activate();

        function activate() {
            // TODO need to provide a way for the user to login
            if (!auth.isAuthenticated) {
                auth.login('jennyc', 'password');
            }
        }

        function save() {
            // Add "Default" role and task.
            vm.project.projectRoles = [
                { name: 'Default' }
            ];
            vm.project.projectTasks = [
                { name: 'Default' }
            ];

            // TODO need to handle errors

            api.addProject(vm.project, function () {
                $location.path('/projects');
            });
        }
    }
})();
