
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export default class List extends Component {
  constructor (props) {
    super(props)
    this.state = {
      articleList: []
    }
  }

  componentDidMount () {
    fetch(`/api/article/list`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 0) {
          this.setState({
            articleList: data.data
          })
        }
      })
  }

  render () {
    let { articleList } = this.state
    return (
      <div className='blog'>
        <div className='list'>
          <div className='add-blog'>
            <Link to="/blog/edit">Add</Link>
          </div>
          {
            articleList.map((item, index) =>
              <div key={index} className='article-item'>
                <Link to={`/blog/${item.id}`}>
                  <h3 className='title'>{item.title}</h3>
                  <p className='message'>
                    <span>{item.createTime}</span>
                  </p>
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
