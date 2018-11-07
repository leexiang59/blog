import React, { Component } from 'react';
import logo from './logo.svg';
import './App.less';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userList: []
    }
  }
  componentDidMount() {
    fetch(`/api/user/list`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 0) {
          this.setState({
            userList: data.data
          })
        }
      })
  }
  render() {
    let { userList } = this.state
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            {
              userList.map((item, index) => <span key={index + ""} style={{ paddingRight: '10px' }}>{item.name}</span>)
            }
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
