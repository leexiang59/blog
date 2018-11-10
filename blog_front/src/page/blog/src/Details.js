
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export default class Details extends Component {
  constructor (props) {
    super(props)
    this.state = {
      articleDetail: {},
      id: this.props.match && this.props.match.params ? this.props.match.params.id-0 : null,
    }
  }

  // 删除
  deleteHandle=()=>{
    fetch(`/api/article/delete`, {
      method: 'POST',
      credentials: 'include',
      headers: {'Content-Type': 'application/json;charset=UTF-8'},
      body: JSON.stringify({
        "id": this.state.id
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 0) {
          this.props.history.push('/blog/')
        }
      })
  }
  componentDidMount () {
    fetch(`/api/article/list/${this.state.id}`)
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
    let { articleDetail,id } = this.state
    return (
      <div className='blog'>
        <div className='detail'>
          <h1 className='title'>{articleDetail.title}</h1>
          <p className='btn-operate'>
            {
              id!==9 &&<button className="btn-delete" onClick={this.deleteHandle}>Delete</button>
            }
            <Link to={`/blog/edit/${articleDetail.id}`}><button className="btn-edit">Edit</button></Link>
          </p>
          <div className='content' dangerouslySetInnerHTML={{ __html: articleDetail.content }} />
        </div>
      </div>
    )
  }
}
