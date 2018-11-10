
import React, { Component } from 'react'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
export default class Edit extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: this.props.match && this.props.match.params ? this.props.match.params.id : null,
      articleData :null,
      title:'',
      editorState : BraftEditor.createEditorState(null)
    }
  }

  // 修改标题
  titleChange=(e)=>{
    this.setState({
      title:e.target.value
    })
  }

  // 修改内容
  handleEditorChange = (editorState) => {
    this.setState({
      editorState: editorState
    })
  }

  // 保存
  saveHandle=(type)=>{
    let {id, title, editorState} = this.state
    fetch(`/api/article/${id ? 'update' : 'add'}`, {
      method: 'POST',
      credentials: 'include',
      headers: {'Content-Type': 'application/json;charset=UTF-8'},
      body: JSON.stringify({
        "id": id || undefined,
        "title": title,
        "content": editorState.toHTML()
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 0) {
          if(type==='btn'){
            this.props.history.push(`/blog/${id || data.data.id || ''}`)
          }else{
            this.props.history.push(`/blog/edit/${data.data.id}`)
            this.props.history.goBack() // 每次Ctrl+S保存之后回退一下history，保证点击浏览器回退按钮时可以返回上一页。
          }
        }
      })
  }
  // Ctrl+S 保存，留在当前页
  saveEditorContentByKey=()=>{
    this.saveHandle('key')
  }
  // 点击按钮保存，跳转回详情页
  saveEditorContent = ()=> {
    this.saveHandle('btn')
  }

  fetchArticle=(id)=>{
    fetch(`/api/article/list/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 0) {
          let backData = data.data[0]
          this.setState({
            articleData: backData,
            title: backData.title,
            editorState: BraftEditor.createEditorState(backData.content)
          })
        }
      })
  }

  componentWillMount () {
    let {id} = this.state
    id && this.fetchArticle(id)
  }

  render () {
    let {title,editorState} = this.state
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
              <div className="article-braft-edit">
                <BraftEditor
                  value={editorState}
                  onChange={this.handleEditorChange}
                  onSave={this.saveEditorContentByKey}
                />
              </div>
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