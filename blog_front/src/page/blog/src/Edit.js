
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
  saveEditorContent = ()=> {
    let {id, title, editorState} = this.state
    fetch(`/api/article/update`, {
      method: 'POST',
      credentials: 'include',
      headers: {'Content-Type': 'application/json;charset=UTF-8'},
      body: JSON.stringify({
        "id": id,
        "title": title,
        "content": editorState.toHTML()
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 0) {
          this.props.history.push(`/blog/${id}`)
        }
      })
  }



  componentWillMount () {
    fetch(`/api/article/list/${this.state.id}`)
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

  render () {
    let {title,editorState} = this.state
    return (
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
                //onSave={this.saveEditorContent}
              />
            </div>
          </div>
          <div className="edit-item item-submit">
            <button className="submit" onClick={this.saveEditorContent}>Save</button>
          </div>
        </div>
      </div>
    )
  }
}