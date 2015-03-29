
(function() {
    'use strict';

    angular
        .module('app')
        .factory('storage', storage);

    function storage() {
        var service = {
                get: get,
                put: put,
                getObject: getObject,
                putObject: putObject
            };

        return service;

        function get(key) {
            return localStorage.getItem(key);
        }

        function put(key, value) {
            localStorage.setItem(key, value);
        }

        function getObject(key) {
            var value = localStorage.getItem(key);
            return JSON.parse(value);
        }

        function putObject(key, value) {
            var valueString = JSON.stringify(value);
            localStorage.setItem(key, valueString);
        }
    }
})();
