import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Header.less'
export default class Header extends Component{
    constructor(props){
        super(props)
        this.state={
            navList:[
                {title:'ABOUT',href:''},
                {title:'RESUME',href:''},
                {title:'BLOG',href:''},
                {title:'CONTACT',href:''}
            ]
        }
    }
    render(){
        let {navList} = this.state
        return(
            <header className='header'>
             <ul>
                 {
                     navList.map((item,index)=><li key={index+""}><Link to={item.href}>{item.title}</Link></li>)
                 }
             </ul>
            </header>
        )
    }
}