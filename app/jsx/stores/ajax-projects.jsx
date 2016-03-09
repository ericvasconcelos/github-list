'use strict';

import Reflux from 'reflux';
import Actions from '../actions/actions.jsx';

const ajaxProjectsStore  = Reflux.createStore({

  listenables: [Actions],

  init: function() {
    this.fetch();
  },

  getInitialState: function() {
    return this.content;
  },

  fetch: function(){

    var self = this,
      request = new XMLHttpRequest();

    request.open(
      'GET',
      'https://api.github.com/orgs/globocom/repos?per_page=100&page=1',
      true
    );

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        const projects = JSON.parse(request.responseText);
        self.trigger({ projects });
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

export default ajaxProjectsStore;
