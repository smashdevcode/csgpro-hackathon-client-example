
(function() {
    'use strict';

    angular
        .module('app')
        .controller('SideNav', SideNav);

    SideNav.$inject = ['$location', 'auth', 'session'];

    function SideNav($location, auth, session) {
        var vm = this;

        vm.isUserAuthenticated = isUserAuthenticated;

        activate();

        function activate() {
        }

        function isUserAuthenticated() {
            return session.isAuthenticated;
        }
    }
})();
