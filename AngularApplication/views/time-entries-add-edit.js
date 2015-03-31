
(function() {
    'use strict';

    angular
        .module('app')
        .controller('TimeEntriesAddEdit', TimeEntriesAddEdit);

    TimeEntriesAddEdit.$inject = ['$q', '$location', '$routeParams', 'api', 'toast'];

    function TimeEntriesAddEdit($q, $location, $routeParams, api, toast) {
        var vm = this;

        vm.timeEntry = {};
        vm.pageTitle = getPageTitle();
        vm.save = save;
        vm.cancel = cancel;

        activate();

        function activate() {
            if (isEdit()) {
                api.getTimeEntry($routeParams.timeEntryId).then(function (timeEntry) {
                    vm.timeEntry = timeEntry;
                });
            }
        }

        function isEdit() {
            return $routeParams.timeEntryId;
        }

        function getPageTitle() {
            return (isEdit() ? 'Edit' : 'Add') + ' Time Entry';
        }

        function save() {
            var savePromise,
                timeEntry = vm.timeEntry;

            // Save the time entry.
            if (isEdit()) {
                savePromise = api.updateTimeEntry(timeEntry);
            } else {
                savePromise = api.addTimeEntry(timeEntry);
            }

            // TODO need to handle errors

            // Once the time entry has been saved...
            savePromise.then(function (data) {
                toast.show('The time entry was successfully saved.');
                $location.path('/home');
            });
        }

        function cancel() {
            $location.path('/home');
        }
    }
})();
