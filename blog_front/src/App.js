import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.less'
import Header from './component/Header/Header'
import About from './page/about'
import Resume from './page/resume'
import { ListPage, DetailsPage, EditPage, AddPage } from './page/blog'
import Contact from './page/contact'
import { util, api } from './component/util'
import {UserInfoProvider} from './component/UserInfoContext'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userInfo: null
    }
  }
  componentDidMount () {
    util.fetchLite({
      url: `${api.user}user_info`,
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
      <UserInfoProvider value={userInfo}>
        <Router>
          <div className='App'>
            <Header />
            <Route exact path='/' component={() => (<About userInfo={userInfo} />)} />
            <Route path='/resume' component={Resume} />
            <Switch>
              <Route path='/blog/edit/:id' component={EditPage} />
              <Route path='/blog/edit' component={EditPage} />
              <Route path='/blog/add' component={AddPage} />
              <Route path='/blog/:id' component={DetailsPage} />
              <Route exact path='/blog' component={ListPage} />
            </Switch>
            <Route path='/contact' component={Contact} />
            <footer />
          </div>
        </Router>
      </UserInfoProvider>
    )
  }
}
export default App
