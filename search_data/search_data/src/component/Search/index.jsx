import React, { Component } from 'react'
import Pubsub from 'pubsub-js'
import {Select} from 'antd'
import 'antd/dist/antd.css'
import './index.css'

export default class Search extends Component {

  state = {
    data:[],
    choose:'',
    method:'',
  }

  componentDidMount() {
    this.token = Pubsub.subscribe('list',(msg,data) => { 
      this.setState({data:data})
    })
  }

  componentWillUnmount() {
    Pubsub.unsubscribe(this.token)

  }


  handle = ()=>{
    let data = [...this.state.data]
    const {choose,method} = this.state
    let len = data.length
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len - 1 - i; j++) {
        if(data[j][choose] > data[j+1][choose]) {
          let t = data[j]
          data[j] = data[j+1]
          data[j+1] = t
        }
      }
    }
    if(method === '降序') data.reverse()
    Pubsub.publish('update', data)
  }

  render() {
    const { Option } = Select;
    return (
      <div className="search">
        选择查询的数据: &nbsp;
        <Select
            onChange={(data) => { 
              this.setState({choose:data})
            }}
            showSearch
            style={{ width: 80}}
            placeholder="选择一个选项"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            filterSort={(optionA, optionB) =>
              optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
            }
          >
            <Option value="stuId">学号</Option>
            <Option value="englishOne">英语1</Option>
            <Option value="englishTwo">英语2</Option>
            <Option value="mathematicsOne">高数1</Option>
            <Option value="mathematicsTwo">高数2</Option>
            <Option value="cProgram">C语言</Option>
            <Option value="javaProgram">Java</Option>
          </Select>&nbsp;&nbsp;&nbsp;
        选择查询方式: &nbsp;
        <Select
            onChange={(data) => { 
              this.setState({method:data})
            }}
            showSearch
            style={{ width: 80}}
            placeholder="选择一个选项"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            filterSort={(optionA, optionB) =>
              optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
            }
          >
            <Option value="升序">升序</Option>
            <Option value="降序">降序</Option>
          </Select>&nbsp;&nbsp;&nbsp;
        <button onClick={this.handle} className="search-pro">查询</button>
      </div>
    )
  }
}
