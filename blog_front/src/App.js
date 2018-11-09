import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.less';
import Header from './component/Header/Header'
import About from './page/about/'
import Resume from './page/resume/'
import Blog from './page/blog/'
import Contact from './page/contact/'
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
    return (
      <div>
        <Router>
          <div className="App">
            <Header />
            <Route exact path='/' component={About} />
            <Route path='/resume' component={Resume} />
            <Route path='/blog' component={Blog} />
            <Route path='/contact' component={Contact} />
            <footer></footer>
          </div>
        </Router>
      </div>
    );
  }
}
export default App;
