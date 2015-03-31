
(function() {
    'use strict';

    angular
        .module('app')
        .factory('api', api);

    api.$inject = ['$q', '$http', 'apiUrl', 'session'];

    function api($q, $http, apiUrl, session) {
        return {
            getUser: getUser,
            getTimeEntry: getTimeEntry,
            addTimeEntry: addTimeEntry,
            updateTimeEntry: updateTimeEntry,
            getProjects: getProjects,
            getProject: getProject,
            addProject: addProject,
            updateProject: updateProject,
            addProjectRole: addProjectRole,
            updateProjectRole: updateProjectRole,
            removeProjectRole: removeProjectRole,
            addProjectTask: addProjectTask,
            updateProjectTask: updateProjectTask,
            removeProjectTask: removeProjectTask
        };

        function getUser() {
            return http('GET', 'users', null);
        }

        function getTimeEntry(timeEntryId) {
            return http('GET', 'timeentries/' + timeEntryId, null);
        }

        function addTimeEntry(timeEntry) {
            return http('POST', 'timeentries', timeEntry);
        }

        function updateTimeEntry(timeEntry) {
            return http('PUT', 'timeentries/' + timeEntry.TimeEntryId, timeEntry);
        }

        function getProjects() {
            return http('GET', 'projects', null);
        }

        function getProject(projectId) {
            return http('GET', 'projects/' + projectId, null);
        }

        function addProject(project) {
            return http('POST', 'projects', project);
        }

        function updateProject(project) {
            return http('PUT', 'projects/' + project.ProjectId, project);
        }

        function addProjectRole(projectRole) {
            return http('POST', 'projectroles', projectRole);
        }

        function updateProjectRole(projectRole) {
            return http('PUT', 'projectroles/' + projectRole.ProjectRoleId, projectRole);
        }

        function removeProjectRole(projectRoleId) {
            return http('DELETE', 'projectroles/' + projectRoleId);
        }

        function addProjectTask(projectTask) {
            return http('POST', 'projecttasks', projectTask);
        }

        function updateProjectTask(projectTask) {
            return http('PUT', 'projecttasks/' + projectTask.ProjectTaskId, projectTask);
        }

        function removeProjectTask(projectTaskId) {
            return http('DELETE', 'projecttasks/' + projectTaskId);
        }

        function http(method, action, data) {
            var authString = btoa(session.username + ':' + session.password);

            return $http({
                    headers: {
                        'Authorization': 'Basic ' + authString
                    },
                    method: method,
                    url: apiUrl + action,
                    data: data
                })
                .then(function (response) {
                        return response.data;
                    }, function (response) {
                        console.error('API Error: ' + response.data);
                        return $q.reject(Error(response.data));
                    });
        }
    }
})();
