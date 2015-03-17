
(function() {
    'use strict';

    angular
        .module('app')
        .factory('auth', auth);

    auth.$inject = ['$rootScope', '$q', 'api', 'session'];

    function auth($rootScope, $q, api, session) {
        var userAuthenticatedEventName = 'auth.userAuthenticated';
        var userUnauthenticatedEventName = 'auth.userUnauthenticated';

        var service = {
            userAuthenticatedEventName: userAuthenticatedEventName,
            userUnauthenticatedEventName: userUnauthenticatedEventName,
            login: login,
            logout: logout
        };

        return service;

        function login(username, password) {
            session.username = username;
            session.password = password;

            // Attempt to get the user from the API.
            return api.getUser()
                .then(function (data) {
                    session.isAuthenticated = true;
                    session.name = data.Name;
                    $rootScope.$broadcast(userAuthenticatedEventName);
                    return 'Login successful.';
                }, function () {
                    resetSession();
                    return $q.reject(Error('Login failed.'));
                });
        }

        function logout() {
            resetSession();
        }

        function resetSession() {
            session.isAuthenticated = false;
            session.name = null;
            session.username = null;
            session.password = null;
            $rootScope.$broadcast(userUnauthenticatedEventName);
        }
    }
})();
