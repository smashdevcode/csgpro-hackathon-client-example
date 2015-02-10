
(function() {
    'use strict';

    angular
        .module('app')
        .controller('Register', Register);

    Register.$inject = ['$location', 'api', 'auth'];

    function Register($location, api, auth) {
        var vm = this;

        activate();

        function activate() {
        }
    }
})();
