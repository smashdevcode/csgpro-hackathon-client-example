
(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProjectAddEdit', ProjectAddEdit);

    ProjectAddEdit.$inject = ['$q', '$location', '$routeParams', 'api', 'toast'];

    function ProjectAddEdit($q, $location, $routeParams, api, toast) {
        var vm = this,
            rolesToRemove = [],
            tasksToRemove = [];

        vm.project = {};
        vm.pageTitle = getPageTitle();
        vm.save = save;
        vm.cancel = cancel;
        vm.addRole = addRole;
        vm.removeRole = removeRole;
        vm.addTask = addTask;
        vm.removeTask = removeTask;

        activate();

        function activate() {
            if (isEdit()) {
                api.getProject($routeParams.projectId).then(function (project) {
                    vm.project = project;
                });
            }
        }

        function isEdit() {
            return $routeParams.projectId;
        }

        function getPageTitle() {
            return (isEdit() ? 'Edit' : 'Add') + ' Project';
        }

        function save() {
            var savePromise,
                project = vm.project;

            // Save the project.
            if (isEdit()) {
                savePromise = api.updateProject(project);
            } else {
                savePromise = api.addProject(project);
            }

            // TODO need to handle errors

            // Once the project has been saved...
            savePromise.then(function (data) {
                // Update the project ID if we were adding a project.
                if (!isEdit()) {
                    project.ProjectId = data.ProjectId;
                }

                // Add "Default" role and task if necessary.
                if (!project.ProjectRoles || project.ProjectRoles.length === 0) {
                    project.ProjectRoles = [
                        { name: 'Default' }
                    ];
                }
                if (!project.ProjectTasks || project.ProjectTasks.length === 0) {
                    project.ProjectTasks = [
                        { name: 'Default' }
                    ];
                }

                var promises = [];

                // Save each project role.
                angular.forEach(project.ProjectRoles, function (role) {
                    // Set the project ID.
                    role.ProjectId = project.ProjectId;

                    if (role.ProjectRoleId) {
                        promises.push(api.updateProjectRole(role));
                    } else {
                        promises.push(api.addProjectRole(role));
                    }
                });

                // Remove roles.
                angular.forEach(rolesToRemove, function (role) {
                    promises.push(api.removeProjectRole(role.ProjectRoleId));
                });

                // Save each project task.
                angular.forEach(project.ProjectTasks, function (task) {
                    // Set the project ID.
                    task.ProjectId = project.ProjectId;

                    if (task.ProjectTaskId) {
                        promises.push(api.updateProjectTask(task));
                    } else {
                        promises.push(api.addProjectTask(task));
                    }
                });

                // Remove tasks.
                angular.forEach(tasksToRemove, function (task) {
                    promises.push(api.removeProjectTask(task.ProjectTaskId));
                });

                // TODO need to handle errors

                $q.all(promises).then(function () {
                    toast.show('The project was successfully saved.');
                    $location.path('/projects');
                });
            });
        }

        function cancel() {
            $location.path('/projects');
        }

        function addRole() {
            vm.project.ProjectRoles.push({});
        }

        function removeRole(roleIndex) {
            // Remove the role.
            var role = vm.project.ProjectRoles.splice(roleIndex, 1)[0];

            // If the role has an ID...
            if (role.ProjectRoleId) {
                // Add the removed role to the "roles to remove" array.
                rolesToRemove.push(role);
            }
        }

        function addTask() {
            vm.project.ProjectTasks.push({});
        }

        function removeTask(taskIndex) {
            // Remove the task.
            var task = vm.project.ProjectTasks.splice(taskIndex, 1)[0];

            // If the task has an ID...
            if (task.ProjectTaskId) {
                // Add the removed task to the "tasks to remove" array.
                tasksToRemove.push(task);
            }
        }
    }
})();
