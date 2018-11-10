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
      userInfo: null
    }
  }
  componentDidMount () {
    fetch(`/api/user/user_info`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 0) {
          this.setState({
            userInfo: data.data
          })
        }
      })
  }
  render () {
    let { userInfo } = this.state
    return (
      <div>
        <Router>
          <div className='App'>
            <Header />
            <Route exact path='/' component={() => (<About userInfo={userInfo} />)} />
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
