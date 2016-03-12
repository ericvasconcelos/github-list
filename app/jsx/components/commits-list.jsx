import React from 'react';
import Reflux from 'reflux';

const CommitsList = React.createClass({

  getInitialState() {
    return {
      commits: [],
      num: 20,
      btnStyle: {},
      currentProject: this.props.currentProject
    };
  },

  componentWillMount() {
    this.setState({commits: this.props.commits.slice(0, this.state.num)});
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      commits: nextProps.commits.slice(0, this.state.num),
      num: 20,
      btnStyle: {},
      currentProject: nextProps.currentProject
    });

    document.querySelector('.project').scrollTop = 0;
  },

  moreCommits() {
    const num = this.state.num + 20;
    const qntyCommits = this.props.commits.length;
    const btnStyle = num >= qntyCommits ? { display: 'none' } : {};

    this.setState({commits: this.props.commits.slice(0, num), num, btnStyle});
  },

  formateDate(date) {
    var newDate = date.slice(0, 10).split('-');
    newDate = newDate[2] + '/' + newDate[1] + '/' + newDate[0];
    return newDate;
  },

  render() {
    if (this.state.commits.length) {
      return (
        <div>
          <h1 className="commits__title">{ this.props.currentProject }</h1>
          <div className="commits__infos">
            <span className="commits__infos__item icon-star">{ this.props.starsProject }</span>
            <span className="commits__infos__item icon-fork">{ this.props.forksProject }</span>
          </div>
          <ul className="commits">
            { this.state.commits.map((commit, i) => {
              return (
                <li key={ i } className="commits__commit" >
                  <div className="commits__commit__img">
                    <img src={ commit.author && commit.author.avatar_url } />
                  </div>
                  <h3 className="commits__commit__author">{ commit.commit.author.name }</h3>
                  <time 
                    className="commits__commit__data"
                    dateTime={commit.commit.author.date}>
                    { this.formateDate(commit.commit.author.date) }
                  </time>
                  <p className="commits__commit__message">{ commit.commit.message }</p>
                </li>
              );
            })}
          </ul>
          <button className="load-more" style={this.state.btnStyle} onClick={ this.moreCommits }>
            Carregar mais commits
          </button>
        </div>
      )
    }

    return null;
  }
});

export default CommitsList;

