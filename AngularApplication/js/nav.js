
(function() {
    'use strict';

    angular
        .module('app')
        .controller('Nav', Nav);

    Nav.$inject = ['$scope', '$location', 'auth', 'session'];

    function Nav($scope, $location, auth, session) {
        var vm = this;

        vm.isAuthenticated = false;
        vm.name = null;
        vm.register = register;
        vm.editProfile = editProfile;
        vm.logout = logout;

        activate();

        function activate() {
            $scope.$on(auth.userAuthenticatedEventName, function() {
                vm.isAuthenticated = true;
                vm.name = session.name;
            });

            $scope.$on(auth.userUnauthenticatedEventName, function() {
                vm.isAuthenticated = false;
                vm.name = null;
            });
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
        }
    }
})();
