
(function() {
    'use strict';

    angular
        .module('app')
        .factory('api', api);

    api.$inject = ['$http', 'apiUrl', 'auth'];

    function api($http, apiUrl, auth) {
        return {
            getUser: getUser,
            getProjects: getProjects,
            getProject: getProject,
            addProject: addProject,
            updateProject: updateProject
        };

        // TODO need to check within each function if the user is logged

        function getUser(success) {
            http('GET', 'users', null, success);
        }

        function getProjects(success) {
            http('GET', 'projects', null, success);
        }

        function getProject(projectId, success) {
            http('GET', 'projects/' + projectId, null, success);
        }

        function addProject(project, success) {
            http('POST', 'projects', project, success);
        }

        function updateProject(project, success) {
            http('PUT', 'projects/' + project.ProjectId, project, success);
        }

        // TODO switch to using promise for success action
        function http(method, action, data, success) {
            var authString = btoa(auth.username + ':' + auth.password);

            $http({
                headers: {
                    'Authorization': 'Basic ' + authString
                },
                method: method,
                url: apiUrl + action,
                data: data
            })
            .success(function (data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                console.log('success');

                if (success) {
                    success(data);
                }
            })
            .error(function (data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log(status);

                // TODO display error message???
            });
        }
    }
})();
