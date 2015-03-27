
(function() {
    'use strict';

    angular
        .module('app')
        .controller('Login', Login);

    Login.$inject = ['$location', 'auth', 'dialog'];

    function Login($location, auth, dialog) {
        var vm = this;

        vm.userName = '';
        vm.password = '';
        vm.login = login;

        activate();

        function activate() {
        }

        function login() {
            console.log('Login: ' + vm.userName + ' ' + vm.password);

            auth.login(vm.userName, vm.password)
                .then(function () {
                       $location.path('/home');
                    }, function () {
                        dialog.showAlert(
                            'Login Failure',
                            'Please check your user name and password and try again.');
                    });
        }
    }
})();
