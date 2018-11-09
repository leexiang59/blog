import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.less'
import Header from './component/Header/Header'
import About from './page/about'
import Resume from './page/resume'
import { List, Details, Edit } from './page/blog'
import Contact from './page/contact'
class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userList: []
    }
  }
  componentDidMount () {
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
  render () {
    return (
      <div>
        <Router>
          <div className='App'>
            <Header />
            <Route exact path='/' component={About} />
            <Route path='/resume' component={Resume} />
            <Switch>
              <Route path='/blog/edit/:id' component={Edit} />
              <Route path='/blog/edit' component={Edit} />
              <Route path='/blog/:id' component={Details} />
              <Route exact path='/blog' component={List} />
            </Switch>
            <Route path='/contact' component={Contact} />
            <footer />
          </div>
        </Router>
      </div>
    )
  }
}
export default App
