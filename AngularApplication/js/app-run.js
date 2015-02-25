
(function() {
    'use strict';

    angular
        .module('app')
        .run(runBlock);

    runBlock.$inject = ['$rootScope', '$location', 'session'];

    function runBlock($rootScope, $location, session) {
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
