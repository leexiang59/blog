import React, { Component } from 'react'
import './about.less';
//import homeLogo from '../../img/home_logo.jpg';
export default class About extends Component {
    render() {
        // let age = new Date().getFullYear()
        return (
            <div className='about'>
                <div className='logo'>
                    {/* <img src={homeLogo} alt=''/> */}
                </div>
                <div className='info'>
                    <p>Name：Will</p>
                    {/* <p>Age：{age - 1993}</p> */}
                    <p>Country：China</p>
                </div>
            </div>
        )
    }
}