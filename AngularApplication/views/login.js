
(function() {
    'use strict';

    angular
        .module('app')
        .controller('Login', Login);

    Login.$inject = ['$location', 'auth'];

    function Login($location, auth) {
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
                    }, function (response) {
                        // TODO do a better job of displaying the login error
                        alert(response);
                    });
        }
    }
})();
