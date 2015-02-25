
(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProjectAdd', ProjectAdd);

    ProjectAdd.$inject = ['$location', 'api', 'auth'];

    function ProjectAdd($location, api) {
        var vm = this;

        vm.project = {};
        vm.save = save;

        activate();

        function activate() {
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

            api.addProject(vm.project).then(function () {
                $location.path('/projects');
            });
        }
    }
})();
