'use strict';

import Reflux from 'reflux';
import Actions from '../actions/actions.jsx';

const ajaxCommitsStore = Reflux.createStore({

  listenables: [Actions],

  onFetchCommits(project) {

    var self = this,
      request = new XMLHttpRequest();

    request.open(
      'GET',
      'https://api.github.com/repos/globocom/' + project + '/commits?per_page=100&page=1',
      true
    );

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        let list = JSON.parse(request.responseText);
        self.trigger({ list });
      } else {
        new Error('Server responded with a status of ' + request.status);
      }
    };

    request.onerror = function() {
      new Error('Connection error');
    };

    request.send();
  }
});

export default ajaxCommitsStore;
