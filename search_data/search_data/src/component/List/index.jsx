import React, { Component } from 'react'
import Pubsub from 'pubsub-js'
import axios from 'axios'
import './index.css'
export default class List extends Component {

  state = {
    data:[]
  }
  componentDidMount() {
    axios.get('http://139.155.249.105:9000/students').then(
      response => { 
        this.setState({data:response.data},() => { 
          Pubsub.publish('list', this.state.data)
        })
      }
    )
    this.token = Pubsub.subscribe('update',(msg,data) => { 
      this.setState({data})
    })
  }

  componentWillUnmount() {
    Pubsub.unsubscribe(this.token)
  }

  render() {
    return (
      <table>
        <thead>
            <tr>
                <th>姓名</th>
                <th>学号</th>
                <th>专业</th>
                <th>班级</th>
                <th>英语1</th>
                <th>英语2</th>
                <th>高数1</th>
                <th>高数2</th>
                <th>C语言</th>
                <th>Java</th>
            </tr>
        </thead>
        <tbody>
            {
              this.state.data.map((person) => { 
                return (
                    <tr key = {person.stuId}>
                      <td>{person.stuName}</td>
                      <td>{person.stuId}</td>
                      <td>{person.major}</td>
                      <td>{person.className}</td>
                      <td>{person.englishOne}</td>
                      <td>{person.englishTwo}</td>
                      <td>{person.mathematicsOne}</td>
                      <td>{person.mathematicsTwo}</td>
                      <td>{person.cProgram}</td>
                      <td>{person.javaProgram}</td>
                    </tr>
                )
              })
            }     
        </tbody>
      </table>
    )
  }
}
