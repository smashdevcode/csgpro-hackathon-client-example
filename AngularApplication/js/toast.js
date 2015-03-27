
(function() {
    'use strict';

    angular
        .module('app')
        .factory('toast', toast);

    toast.$inject = ['$mdToast'];

    function toast($mdToast) {
        return {
            show: show
        };

        function show(content) {
            $mdToast.show(
                $mdToast.simple()
                    .content(content)
                    .position('bottom right'));
        }
    }
})();
