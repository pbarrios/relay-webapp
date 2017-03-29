(function () {
  'use strict';

  angular
    .module('dopplerRelay')
    .service('settings', settings);

  settings.$inject = [
    '$http',
    '$q',
    'RELAY_CONFIG',
    'auth'
  ];
  function settings($http, $q, RELAY_CONFIG, auth) {
    var settingsService = {
      getDomains: getDomains,
      createActiveOrDisableDomain: createActiveOrDisableDomain,
      setDefaultDomain: setDefaultDomain,
      deleteDomain: deleteDomain
    };

    return settingsService;

    function createActiveOrDisableDomain (domain, isDisable) {
      var url = RELAY_CONFIG.baseUrl
        + '/accounts/' + auth.getAccountName()
        + '/domains/'
        + domain;

      var data = isDisable ? 'IsDisabled: true' : null;

      return $http({
        actionDescription: 'action_adding_domain',
        method: 'PUT',
        data: { data },
        url: url
      });
    }

    function setDefaultDomain (domain) {
      var url = RELAY_CONFIG.baseUrl
        + '/accounts/' + auth.getAccountName()
        + '/domains'
        + '/default';

      return $http({
        actionDescription: 'action_setting_default_domain',
        method: 'PUT',
        data: {
          'name': domain
        },
        url: url
      });
    }

    function deleteDomain (domain) {
      var url = RELAY_CONFIG.baseUrl
        + '/accounts/' + auth.getAccountName()
        + '/domains/'
        + domain;

      return $http({
        actionDescription: 'action_deleting_domain',
        method: 'DELETE',
        data: {},
        url: url
      });
    }
    
    function disableDomain (domain) {
      var url = RELAY_CONFIG.baseUrl
        + '/accounts/' + auth.getAccountName()
        + '/domains/'
        + domain;

      return $http({
        actionDescription: 'action_adding_domain',
        method: 'PUT',
        data: {},
        url: url
      });
    }

    function getDomains() {
      var url = RELAY_CONFIG.baseUrl
        + '/accounts/' + auth.getAccountName()
        + '/domains';

      return $http({
        actionDescription: 'Getting domains',
        method: 'GET',
        url: url
      })
      .then(function (response) {
        return response;
      });
    }
}
})();
