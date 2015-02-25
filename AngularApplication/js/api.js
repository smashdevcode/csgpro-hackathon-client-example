
(function() {
    'use strict';

    angular
        .module('app')
        .factory('api', api);

    api.$inject = ['$q', '$http', 'apiUrl', 'session'];

    function api($q, $http, apiUrl, session) {
        return {
            getUser: getUser,
            getProjects: getProjects,
            getProject: getProject,
            addProject: addProject,
            updateProject: updateProject
        };

        function getUser() {
            return http('GET', 'users', null);
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
