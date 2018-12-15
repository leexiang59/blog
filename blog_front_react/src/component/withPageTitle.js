/**
 * 利用高阶组件为每个路由页面增加特定title
 * */
import React, {Component} from 'react'
const withPageTitle = (Page, title) => {
  return class extends Component {
    componentDidMount () {
      let pageTitle = document.getElementsByTagName('title')[0]
      pageTitle.text = title
    }
    render () {
      return <Page />
    }
  }
}

export default withPageTitle
