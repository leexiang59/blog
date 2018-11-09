import React, { Component } from 'react'
import './blog.less'
import List from './src/List'
import Details from './src/Details'
import Edit from './src/Edit'
class Blog extends Component {
  render () {
    let thisId = this.props.match && this.props.match.params ? this.props.match.params.id : null
    return (
      <div className='blog'>
        {
          thisId
            ? <Details id={thisId} />
            : <List />
        }
      </div>
    )
  }
}

export {Blog, Edit}
