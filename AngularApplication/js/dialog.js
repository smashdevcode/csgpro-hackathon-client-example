
(function() {
    'use strict';

    angular
        .module('app')
        .factory('dialog', dialog);

    dialog.$inject = ['$mdDialog'];

    function dialog($mdDialog) {
        return {
            showAlert: showAlert
        };

        function showAlert(title, content) {
            var alert = $mdDialog.alert({
                title: title,
                content: content,
                ok: 'Close'
            });
            $mdDialog
                .show( alert )
                .finally(function() {
                    alert = undefined;
                });
        }
    }
})();
