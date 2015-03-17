
(function() {
    'use strict';

    angular
        .module('app')
        .factory('session', session);

    function session() {
        return {
            isAuthenticated: false,
            name: null,
            username: null,
            password: null
        };
    }
})();
