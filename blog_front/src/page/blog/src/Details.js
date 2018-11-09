
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export default class Details extends Component {
  constructor (props) {
    super(props)
    this.state = {
      articleDetail: {}
    }
  }

  componentDidMount () {
    let thisId = this.props.match && this.props.match.params ? this.props.match.params.id : null
    fetch(`/api/article/list/${thisId}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 0) {
          this.setState({
            articleDetail: data.data[0]
          })
        }
      })
  }

  render () {
    let { articleDetail } = this.state
    return (
      <div className='blog'>
        <div className='detail'>
          <h1 className='title'>{articleDetail.title}</h1>
          <p className='btn-edit'><Link to={`/blog/edit/${articleDetail.id}`}>Edit</Link></p>
          <div className='content' dangerouslySetInnerHTML={{ __html: articleDetail.content }} />
        </div>
      </div>
    )
  }
}
