import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Reflux from 'reflux';
import Actions from '../actions/actions.jsx';

import { ajaxProjectsStore, ajaxCommitsStore } from '../stores';

import CommitsList from '../components/commits-list';

const Home = React.createClass({

  mixins: [
    Reflux.connect(ajaxProjectsStore, 'content'),
    Reflux.connect(ajaxCommitsStore, 'commits')
  ],

  getInitialState() {
    return {
      content: { projects: [] },
      commits: { list: [] },
      currentProject: '',
      starsProject: 0,
      forksProject: 0
    };
  },

  _handleClick(event) {
    const projectName = event.currentTarget.getAttribute('data-project');
    this.setState({
      currentProject: projectName,
      starsProject: event.currentTarget.getAttribute('data-stars'),
      forksProject: event.currentTarget.getAttribute('data-forks')
    });
    Actions.fetchCommits(projectName);
  },

  _renderProjects(projects) {
    if (projects) {

      projects.sort(function(a, b) {
        return (b.stargazers_count - a.stargazers_count) || (b.id - a.id);
      });

      return (
        <div>
          { projects.map((project, i) => {
            return (
              <a key={ i }
               className="sidebar__project"
               href={"#/" + project.name }
               data-project={ project.name }
               data-stars={ project.stargazers_count }
               data-forks={ project.forks_count }
               onClick={ this._handleClick }>
                { project.name }
              </a>
            );
          })}
        </div>
      )
    }
  },

  render() {
    return (
      <div>
        <div className="sidebar">
          <h1 className="sidebar__title">Projetos</h1>
          <nav>
            { this._renderProjects(this.state.content.projects) }
          </nav>
        </div>
        <div className="project">
          <CommitsList commits={ this.state.commits.list }
            currentProject={ this.state.currentProject }
            starsProject={ this.state.starsProject }
            forksProject={ this.state.forksProject } /> 
        </div>
      </div>
    )
  }

});

ReactDOM.render(
  <Home />,
  document.getElementById('app')
);














