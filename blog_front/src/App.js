import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.less'
import Header from './component/Header/Header'
import About from './page/about'
import Resume from './page/resume'
import { List, Details, Edit, Add } from './page/blog'
import Contact from './page/contact'
import util from './component/util'
class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userInfo: null
    }
  }
  componentDidMount () {
    util.fetchLite({
      url: `/api/user/user_info`,
      done: data => {
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
              <Route path='/blog/add' component={Add} />
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
