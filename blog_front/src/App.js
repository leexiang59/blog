import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.less';
import Header from './component/Header/Header'
import homeLogo from './img/home_logo.jpg';
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
    let age = new Date().getFullYear()
    return (
      <div  className="App">
        <Router>
          <Header />
        </Router>
        <div className='home'>
          <div className='logo'>
            <img src={homeLogo} />
          </div>
          <div className='info'>
            <p>Age：{age-1993}</p>
            <p>Country：CHINA</p>
          </div>
        </div>
        <footer></footer>
      </div>
    );
  }
}

export default App;
