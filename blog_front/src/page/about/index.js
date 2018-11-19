import React, { Component } from 'react'
import './about.less'
import {util,api} from '../../component/util'
// import homeLogo from '../../img/home_logo.jpg';
export default class About extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showLogin: false,
      userName: '',
      password: ''
    }
  }

  valueChange = (type, value) => {
    this.setState({[type]: value})
  }

  // 登录
  loginHandle=()=> {
    let {userName, password} = this.state
    util.fetchLite({
      url: `${api.user}login`,
      options: {
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=UTF-8'},
        body: JSON.stringify({
          "name": userName,
          "password": password
        })
      },
      done: data => {
        window.location.reload()
      }
    })
  }
  render () {
    // let age = new Date().getFullYear()
    const {userInfo} = this.props
    let {showLogin, userName, password} = this.state
    return (
      <div className='about'>
        {
          !showLogin ?
            <div className={`logo logo-${userInfo?'login':'logout'}`}
                 onClick={()=>{this.setState({showLogin:true})}}>
              {/* <img src={homeLogo} alt=''/> */}
            </div>
            : <div className="login-form">
              <input type='text'
                     value={userName}
                     onChange={(e) => this.valueChange('userName', e.target.value)}/>
              <input type='password'
                     value={password}
                     onChange={(e) => this.valueChange('password', e.target.value)}/>
              <button onClick={this.loginHandle}>Go</button>
            </div>
        }
        <div className='info'>
          <p>Name：Will</p>
          {/* <p>Age：{age - 1993}</p> */}
          <p>Country：China</p>
        </div>
      </div>
    )
  }
}
