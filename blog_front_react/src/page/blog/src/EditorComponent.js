
import React, { Component } from 'react'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
export default class EditorComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      articleData :null,
      editorState : BraftEditor.createEditorState(this.props.value||null)
    }
  }

  // 修改内容
  handleEditorChange = (editorState) => {
    this.setState({
      editorState: editorState
    })
    this.props.editorChange(editorState)
  }

  // Ctrl+S 保存，留在当前页
  saveEditorContentByKey=()=>{
    this.props.saveHandle('key')
  }
  render () {
    let {editorState} = this.state
    return (
      <div className="article-braft-edit">
        <BraftEditor
          value={editorState}
          onChange={this.handleEditorChange}
          onSave={this.saveEditorContentByKey}
        />
      </div>
    )
  }
}