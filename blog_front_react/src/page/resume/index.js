import React, { Component } from 'react'
import './resume.less'
import resume_will from './resume_will.pdf'
export default class Resume extends Component {
  constructor (props){
    super(props)
    this.state={
      platform:{}
    }
  }
  pdfLoaded = () => {
    //console.log(234)
  }

  noSupportPDF=()=>(
    <p className="no-support-pdf">
      This browser does not support PDFs. Please view the PDF：
      <a href='http://www.willli.top/static/media/resume_will.60e513de.pdf'>here</a>.
    </p>
  )

  componentDidMount () {
    //平台、设备和操作系统
    let system = {
      win: false,
      mac: false,
      xll: false,
      app: false
    };
    //检测平台
    let p = navigator.platform;
    system.win = p.indexOf("Win") === 0;
    system.mac = p.indexOf("Mac") === 0;
    system.x11 = (p === "X11") || (p.indexOf("Linux") === 0);
    if (system.win || system.mac || system.xll) {
      system.app = false
    } else {
      system.app = true
    }
    this.setState({platform:system})
  }

  render () {
    let {platform} = this.state
    return (
      <div className='resume'>
        {
          platform.app ?
            this.noSupportPDF() :
            <div className="resume-cont">
              <div className="pdf-loading">Loading...</div>
              <object data={resume_will} type='application/pdf' style={{margin: '0 auto'}}>
                <iframe
                  src={resume_will}
                  type='application/pdf'
                  title='Resume of Will'
                  style={{border: 'none'}}
                  onLoad={this.pdfLoaded}
                />
                {this.noSupportPDF()}
              </object>
            </div>
        }
      </div>
    )
  }
}
