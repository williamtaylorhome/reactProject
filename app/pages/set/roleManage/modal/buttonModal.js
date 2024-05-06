
import React, { Component } from 'react'
import { Button, Spin, Row, Col } from 'antd'
import Drawer from '@components/draw/draw'
import {
  fetchButtonList,
  fetchChangeModuleStatus,
} from '@apis/manage'

// Declare components and output them externally
export default class pop extends Component {
  // Initialize page constants and bind event methods
  constructor(props) {
    super(props)
    this.state = {
      selectedRowKeys: [],
      loading: false,
      dataSource: [],
    }
    this.change = this.change.bind(this)
    this.saveChecked = this.saveChecked.bind(this)
    this.selectChecked = this.selectChecked.bind(this)
  }

  componentWillMount() {
    this.state.selectedRowKeys = this.props.checkedIdArr[this.props.itemId] || []
    this.getList()
  }

  getList() {
    this.setState({
      loading: true,
    }, () => {
      fetchButtonList({ id: this.props.itemId }, (result) => {
        const data = result.data.list
        const dataSource = []
        data.map((item) => {
          if (item.status === 0) {
            const { selectedRowKeys } = this.state
            selectedRowKeys.map((key) => {
              if (item.id === key) {
                item.checked = true
              }
            })
            dataSource.push(item)
          }
        })
        this.setState({
          loading: false,
          dataSource: dataSource,
        })
      })
    })
  }

  // componentWillReceiveProps(nextProps) {
//   this.getList()
// }

  // Online and offline
// showOrHide(id, val) {
//   fetchChangeModuleStatus({ id: id, status: val }, (result) => {
//     this.getList()
//   })
// }

  selectChecked() {
    // const checkedArr = []
    this.state.dataSource.map((item) => {
      item.checked = true
      // Checked arr.push(item.id)
    })
    this.setState({})
    // This.props.save checked(checked arr)
  }

  saveChecked() {
    // const { selectedRowKeys } = this.state
// if (selectedRowKeys.length === 0) {
//   message.info('Please select the button permissions available to users')
//   return
// }
    const checkedArr = []
    this.state.dataSource.map((item) => {
      if (item.checked) {
        checkedArr.push(item.id)
      }
    })
    this.props.saveChecked(checkedArr)
  }

  footer() {
    const { cancelButton } = this.props
    return (
      <div>
        <Button type="primary" onClick={this.selectChecked}>select all</Button>
        <Button type="primary" onClick={this.saveChecked}>Sure</Button>
        <Button onClick={cancelButton}>Cancel</Button>
      </div>
    )
  }

  change(id, index) {
    const data = this.state.dataSource[index]
    data.checked = !data.checked
    this.setState({})
  }

  render() {
    const { visible, cancelButton, title } = this.props
    const { loading, dataSource } = this.state
    return (
      <Drawer
        visible={visible}
        title={title}
        onCancel={cancelButton}
        footer={this.footer()}
        className="modal-header modal-body"
      >
        <Spin spinning={loading}>
          <div className="buttonLayout-lzr">
            <Row gutter={8}>
              {dataSource.map((arr, i) =>
                (<Col span="12" key={i} >
                  <Button
                    type={arr.checked ? 'primary' : 'ghost'}
                    onClick={() => this.change(arr.id, i)}
                    title={arr.resName}
                  >
                    {arr.resName}
                  </Button>
                </Col>))}
            </Row>
          </div>
        </Spin>
      </Drawer>
    )
  }
}
