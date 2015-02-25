
(function() {
    'use strict';

    angular
        .module('app')
        .controller('Home', Home);

    Home.$inject = ['api', 'auth'];

    function Home(api, auth) {
        var vm = this;

        vm.name = '';

        activate();

        function activate() {

            // TODO just get the user information from the auth service

            api.getUser().then(function (user) {
                console.log(user);
                vm.name = user.Name;
            });
        }
    }
})();
