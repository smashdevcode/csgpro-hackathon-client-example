
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
            // TODO need to provide a way for the user to login
            if (!auth.isAuthenticated) {
                auth.login('jennyc', 'password');
            }

            api.getUser(function (user) {
                console.log(user);

                if (user) {
                    vm.name = user.Name;
                }
            });
        }
    }
})();
