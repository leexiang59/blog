
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {util, api} from '../../../component/util'
class List extends Component {
  constructor (props) {
    super(props)
    this.state = {
      articleList: []
    }
  }

  componentDidMount () {
    util.fetchLite({
      url: `${api.article}list`,
      done: data => {
        this.setState({
          articleList: data.data
        })
      }
    })
  }
  render () {
    let { articleList } = this.state
    const {userInfo} = this.props
    return (
      <div className='blog'>
        <div className='list'>
          {
            userInfo &&
            <div className='add-blog'>
              <Link to='/blog/add'>Add</Link>
            </div>
          }
          {
            articleList.map((item, index) =>
              <div key={index} className='article-item'>
                <Link to={`/blog/${item.id}`}>
                  <h3 className='title'>{item.title}</h3>
                  {/* <p className='message'>
                    <span>{item.createTime}</span>
                  </p> */}
                  <p className='content' dangerouslySetInnerHTML={{ __html: item.content }} />
                </Link>
              </div>
            )
          }
        </div>
      </div>
    )
  }
}

export default List
