
import React, { Component } from 'react'
import EditorComponent from './EditorComponent'
export default class Add extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title:'',
      articleData :null,
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
    let {title, articleData} = this.state
    fetch(`/api/article/add`, {
      method: 'POST',
      credentials: 'include',
      headers: {'Content-Type': 'application/json;charset=UTF-8'},
      body: JSON.stringify({
        "title": title,
        "content": articleData.toHTML()
      })
    }).then(res => res.json())
      .then(data => {
        if (data.status === 0) {
          // 点击按钮保存时，跳转详情页。
          if(type==='btn'){
            this.props.history.push(`/blog/${data.data.id || ''}`)
          }else{
            // Ctrl+S保存时，跳转对应详情页。由添加转为编辑状态。
            this.props.history.push(`/blog/edit/${data.data.id}`)
            //this.props.history.goBack() // 每次Ctrl+S保存之后回退一下history，保证点击浏览器回退按钮时可以返回上一页。
          }
        }
      })
  }

  // 点击按钮保存，跳转回详情页
  saveEditorContent = ()=> {
    this.saveHandle('btn')
  }

  render () {
    let {title} = this.state
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
              <EditorComponent
                saveHandle={this.saveHandle}
                editorChange={this.editorChange}
              />
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