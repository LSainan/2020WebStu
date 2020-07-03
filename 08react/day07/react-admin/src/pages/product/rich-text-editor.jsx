import React, { Component } from 'react';
import PropTypes from "prop-types"
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default class RichTextEditor extends Component {
  static proptype = {
    detail: PropTypes.string
  }
  state = {
    editorState: EditorState.createEmpty(),
  }
  constructor(props) {
    super(props)
    const html = this.props.detail;
    if (html) {
      //富文本回显
      const contentBlock = htmlToDraft(html)
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
      const editorState = EditorState.createWithContent(contentState);
      this.state={
        editorState
      }
    }else{
      this.state={ editorState: EditorState.createEmpty()}
    }
  }
  // 编辑触发这个函数
  onEditorStateChange  = (editorState) => {
    // console.log('onEditorStateChange')
    this.setState({
      editorState,
    });
  };
  //
  getDetail = () => {
    // 返回输入内容对应的html字符串
    return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
}

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          editorStyle={{ border: '1px solid #999', minHeight: 200, maxHeight: 600 }}
          onEditorStateChange={this.onEditorStateChange}
        />
      </div>
    );
  }
}
//   去拿html数据
//   draftToHtml(convertToRaw(editorState.getCurrentContent()))
// 父组件怎么去拿子组件里面的数据呐？ ref
// 父组件中拿实例，创建一个ref React.createRef()
