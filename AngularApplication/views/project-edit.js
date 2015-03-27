
(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProjectEdit', ProjectEdit);

    ProjectEdit.$inject = ['$location', '$routeParams', 'api', 'toast'];

    function ProjectEdit($location, $routeParams, api, toast) {
        var vm = this;

        vm.project = {};
        vm.pageTitle = 'Edit Project';
        vm.save = save;
        vm.cancel = cancel;

        activate();

        function activate() {
            api.getProject($routeParams.projectId).then(function (project) {
                vm.project = project;
            });
        }

        function save() {

            // TODO need to handle errors

            api.updateProject(vm.project).then(function () {
                toast.show('The project was successfully updated.');
                $location.path('/projects');
            });
        }

        function cancel() {
            $location.path('/projects');
        }
    }
})();
