
(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProjectAdd', ProjectAdd);

    ProjectAdd.$inject = ['$location', 'api', 'toast'];

    function ProjectAdd($location, api, toast) {
        var vm = this;

        vm.project = {};
        vm.pageTitle = 'Add Project';
        vm.save = save;
        vm.cancel = cancel;

        activate();

        function activate() {
        }

        function save() {
            // Add "Default" role and task if necessary.
            if (!vm.project.projectRoles || vm.project.projectRoles.length === 0) {
                vm.project.projectRoles = [
                    { name: 'Default' }
                ];
            }
            if (!vm.project.projectTasks || vm.project.projectTasks.length === 0) {
                vm.project.projectTasks = [
                    { name: 'Default' }
                ];
            }

            // TODO need to handle errors

            api.addProject(vm.project).then(function () {
                toast.show('The project was successfully added.');
                $location.path('/projects');
            });
        }

        function cancel() {
            $location.path('/projects');
        }
    }
})();
