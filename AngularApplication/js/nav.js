
(function() {
    'use strict';

    angular
        .module('app')
        .controller('Nav', Nav);

    Nav.$inject = ['$location', 'auth', 'session'];

    function Nav($location, auth, session) {
        var vm = this;

        vm.getUserName = getUserName;
        vm.isUserAuthenticated = isUserAuthenticated;
        vm.register = register;
        vm.editProfile = editProfile;
        vm.logout = logout;

        activate();

        function activate() {
        }

        function getUserName() {
            return session.name;
        }

        function isUserAuthenticated() {
            return session.isAuthenticated;
        }

        function register() {
            $location.path('/register');
        }

        function editProfile() {
            // TODO setup "Edit Profile" controller and view
            alert('Not implemented!');
        }

        function logout() {
            auth.logout();

            // Send the user to the default view in order to refresh the content area.
            $location.path('/');
        }
    }
})();
