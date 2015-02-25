
(function() {
    'use strict';

    angular
        .module('app')
        .factory('session', session);

    function session() {
        return {
            isAuthenticated: false,
            username: null,
            password: null
        };
    }
})();
