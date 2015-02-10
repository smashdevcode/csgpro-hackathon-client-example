
(function() {
    'use strict';

    angular
        .module('app')
        .factory('auth', auth);

    function auth() {
        var service = {
            isAuthenticated: false,
            username: null,
            password: null,
            login: login,
            logout: logout
        };

        return service;

        function login(username, password) {
            // TODO need to authenticate the user
            service.isAuthenticated = true;
            service.username = username;
            service.password = password;
        }

        function logout() {
            service.isAuthenticated = false;
            service.username = null;
            service.password = null;
        }
    }
})();
