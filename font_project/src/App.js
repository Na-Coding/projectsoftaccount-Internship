import React, { Component } from 'react';
import './App.css';
import './sty.css';
import RouterChild from './static/Router'
import { get, post } from './service/service'
import { BrowserRouter as Router, Link, Route, withRouter } from 'react-router-dom'
class App extends Component {

  componentDidMount() {
    this.check_token()
  }
  check_token = async () => {
    try {
      if (window.location.pathname !== '/login'){
       const stage =  window.localStorage.getItem('stage' )
       if(!stage){
          this.props.history.push('/login')
       }
      }
        // await get("user/check_token").then(res => {
        //   if (!res.success) {
        //     this.props.history.push('/login')
        //   }
        // }).catch(() => {
        //   this.props.history.push('/login')
        // })
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    return (
      <div >
        {this.props.children}
      </div>
    );
  }
}
export default withRouter(App);
