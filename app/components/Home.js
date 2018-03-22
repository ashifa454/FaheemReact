// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.css';
import openSocket from 'socket.io-client';
type Props = {};
const socket=openSocket('http://localhost:8003');
export default class Home extends Component<Props> {
  props: Props;
  constructor(){
    super();
    this.state={
      userConfig:null,
      clusterInfo:[]
    }
  }
componentWillUnMount(){
  socket.emit('let_me_go',()=>{

  });
}
componentDidMount(){
  socket.emit('initiate_node',()=>{
  });
  socket.on('setup_credentials',(data)=>{
    Object.keys(data).map((key)=>{
      if(key!=socket.id){
        this.state.clusterInfo.push(data[key]._id);
      }else{
        this.setState({
          userConfig:data[socket.id]
        },()=>{
          console.log(this.state.userConfig);
        })
      }
    });
  });
}
  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          {
            (this.state.userConfig&&this.state.userConfig._id)?(
              <div>
              <p>id || {this.state.userConfig._id}</p>
              <p>KPAP || {this.state.userConfig.KPAK}</p>
              <p>SSK || {this.state.userConfig.SSK}</p>
              <p>PVT-x || {this.state.userConfig.PVT[0]}</p>
              <p>PVT-y || {this.state.userConfig.PVT[1]}</p>
              </div>
            ):(
              <h3>Loading</h3>
            )
          }
            <div>
            {
              this.state.clusterInfo.length>0?
              this.state.clusterInfo.map((item)=>{
                return <li>User {item}</li>
                })
              :(
                <h3>No Other User than You</h3>
              )
            }
            </div>
        </div>
      </div>
    );
  }
}
