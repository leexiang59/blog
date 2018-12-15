
import React, { Component } from 'react'
import EditorComponent from './EditorComponent'
import {util,api} from '../../../component/util'
export default class Edit extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: this.props.match && this.props.match.params ? this.props.match.params.id : null,
      articleData :null,
      title:'',
    }
  }

  // 修改标题
  titleChange=(e)=>{
    this.setState({
      title:e.target.value
    })
  }

  // 修改内容
  editorChange = (articleData) => {
    this.setState({
      articleData
    })
  }

  // 保存
  saveHandle=(type)=>{
    let {id, title, articleData} = this.state
    util.fetchLite({
      url: `${api.article}update`,
      options:{
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=UTF-8'},
        body: JSON.stringify({
          "id": id,
          "title": title,
          "content": articleData.toHTML()
        })
      },
      done: data => {
        // 点击按钮保存时，跳转详情页。Ctrl+S保存时，留在当前编辑页。
        if(type==='btn'){
          this.props.history.push(`/blog/${id || data.data.id || ''}`)
        }
      }
    })
  }

  // 点击按钮保存，跳转回详情页
  saveEditorContent = ()=> {
    this.saveHandle('btn')
  }

  fetchArticle=(id)=>{
    util.fetchLite({
      url: `${api.article}list/${id}`,
      done: data => {
        let backData = data.data[0]
        this.setState({
          title: backData.title,
          articleData: backData.content
        })
      }
    })
  }

  componentWillMount () {
    let {id} = this.state
    id && this.fetchArticle(id)
  }

  render () {
    let {title,articleData} = this.state
    return (
      <div className="blog">
        <div className='edit'>
          <div className="edit-content">
            <div className="edit-item">
              <p>Title：</p>
              <input className="title" value={title} onChange={this.titleChange}/>
            </div>
            <div className="edit-item">
              <p>Content：</p>
              {
                articleData===null || articleData===undefined ? '' :
                  <EditorComponent
                    value={articleData}
                    saveHandle={this.saveHandle}
                    editorChange={this.editorChange}
                  />
              }
            </div>
            <div className="edit-item item-submit">
              <button className="submit" onClick={this.saveEditorContent}>Save</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}