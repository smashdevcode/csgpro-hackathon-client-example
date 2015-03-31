
(function() {
    'use strict';

    angular
        .module('app')
        .controller('Home', Home);

    Home.$inject = ['$location', 'api', 'auth'];

    function Home($location, api, auth) {
        var vm = this;

        vm.add = add;

        activate();

        function activate() {
        }

        function add() {
            $location.path('/timeentries/add');
        }
    }
})();
