/**
 * 头部导航
 * */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Header.less'
export default class Header extends Component {
  constructor (props) {
    super(props)
    this.state = {
      navList: [
        { title: 'ABOUT', href: '/' },
        { title: 'RESUME', href: '/resume' },
        { title: 'BLOG', href: '/blog' },
        { title: 'CONTACT', href: '/contact' }
      ]
    }
  }
  render () {
    let { navList } = this.state
    return (
      <>
        <header className='header'>
          <ul>
            {
              navList.map((item, index) => <li key={index + ''}><Link to={item.href}>{item.title}</Link></li>)
            }
          </ul>
        </header>
      </>
    )
  }
}
