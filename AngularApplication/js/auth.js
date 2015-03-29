
(function() {
    'use strict';

    angular
        .module('app')
        .factory('auth', auth);

    auth.$inject = ['$q', 'storage', 'api', 'session'];

    function auth($q, storage, api, session) {
        var service = {
                login: login,
                attemptLogin: attemptLogin,
                logout: logout
            },
            loginPersistenceCookieKey = 'LoginPersistence';

        return service;

        function login(username, password, persist) {
            session.username = username;
            session.password = password;

            // Attempt to get the user from the API.
            return api.getUser()
                .then(function (data) {
                    session.isAuthenticated = true;
                    session.name = data.Name;

                    if (persist) {
                        persistLogin(username, password);
                    }

                    return true;
                }, function () {
                    resetSession();

                    return $q.reject(Error('Login failed.'));
                });
        }

        function attemptLogin() {
            var persistedLogin = getPersistedLogin();

            if (persistedLogin) {
                // Assume that the persisted login is going to work
                // and set the "is authenticated" flag.
                // This is necessary as verifying the login is an asynchronous
                // operation so by setting this flag here we prevent the user
                // from being unnecessarily redirected to the login view.
                session.isAuthenticated = true;

                // When attempting the login don't persist the login
                // as we've already got a persisted login.
                return login(persistedLogin.username, persistedLogin.password, false)
                    .then(function () {
                        // Nothing to do

                        return true;
                    }, function () {
                        // Persisted login failed... so clear the persisted login.
                        resetPersistedLogin();

                        return $q.reject(Error('Persisted login failed.'));
                    });
            }

            return null;
        }

        function logout() {
            resetSession();
            resetPersistedLogin();
        }

        function resetSession() {
            session.isAuthenticated = false;
            session.name = null;
            session.username = null;
            session.password = null;
        }

        function persistLogin(username, password) {
            var value = {
                    username: username,
                    password: password
                };

            storage.putObject(loginPersistenceCookieKey, value);
        }

        function getPersistedLogin() {
            return storage.getObject(loginPersistenceCookieKey);
        }

        function resetPersistedLogin() {
            storage.putObject(loginPersistenceCookieKey, null);
        }
    }
})();
