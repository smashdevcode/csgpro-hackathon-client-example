
(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProjectEdit', ProjectEdit);

    ProjectEdit.$inject = ['$location', '$routeParams', 'api', 'auth'];

    function ProjectEdit($location, $routeParams, api) {
        var vm = this;

        vm.project = {};
        vm.save = save;

        activate();

        function activate() {
            api.getProject($routeParams.projectId).then(function (project) {
                vm.project = project;
            });
        }

        function save() {

            // TODO need to handle errors

            api.updateProject(vm.project).then(function () {
                $location.path('/projects');
            });
        }
    }
})();
