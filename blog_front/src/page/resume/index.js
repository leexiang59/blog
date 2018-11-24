import React, { Component } from 'react'
import './resume.less'
import resume_will from './resume_will.pdf'
export default class Resume extends Component {
  pdfLoaded=()=>{
    //console.log(234)
  }
  render () {
    return (
      <div className='resume'>
        <div className="pdf-loading">Loading...</div>
        <object data={resume_will} type='application/pdf' style={{ margin: '0 auto' }} >
          <iframe
            src={resume_will}
            type='application/pdf'
            title='Resume of Will'
            style={{ border: 'none' }}
            onLoad={this.pdfLoaded}
          />
          <p className="no-support-pdf">
            This browser does not support PDFs. Please download the PDF to view it：
            <a href='http://www.willli.top/static/media/resume_will.60e513de.pdf'> Download PDF</a>.
          </p>
        </object>
      </div>
    )
  }
}
