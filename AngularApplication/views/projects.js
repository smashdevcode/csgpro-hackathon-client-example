
(function() {
    'use strict';

    angular
        .module('app')
        .controller('Projects', Projects);

    Projects.$inject = ['$location', 'api', 'auth'];

    function Projects($location, api) {
        var vm = this;

        vm.projects = [];
        vm.add = add;
        vm.edit = edit;

        activate();

        function activate() {
            api.getProjects().then(function (projects) {
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
