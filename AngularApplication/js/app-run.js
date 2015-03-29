
(function() {
    'use strict';

    angular
        .module('app')
        .run(runBlock);

    runBlock.$inject = ['$rootScope', '$location', 'auth', 'session'];

    function runBlock($rootScope, $location, auth, session) {
        // Attempt to login.
        var persistedLogin = auth.attemptLogin();
        if (persistedLogin) {
            persistedLogin.catch(function () {
                // If the persisted login fails...
                // then send the user to the login view.
                $location.path('/login');
            });
        }

        // Wire up the route change start handler
        // in order to determine if the requested route requires a user login.
        $rootScope.$on('$routeChangeStart', function(event, next, current) {
            // If the "require login" property is undefined or is set to "true"
            // and we don't have an authenticated user...
            // then send the user to the "Login" view.
            if (!session.isAuthenticated && (next.requireLogin === undefined || next.requireLogin === true)) {
                $location.path('/login');
                event.preventDefault();
            }
        });
    }
})();
