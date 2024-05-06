
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, message, Badge, Popconfirm } from 'antd'
import TableList from '@tableList'
import Drawer from '@components/draw/draw'
import {
  // Fetch button list,
  fetchModuleDelete,
  fetchChangeModuleStatus,
} from '@apis/manage'

// Connect public constants and data methods returned by the backend and place them in props to call
// @connect((state, props) => ({
//   config: state.config,
// }))
// Declare components and output them externally
export default class pop extends Component {
  // Initialize page constants and bind event methods
  constructor(props) {
    super(props)
    this.state = {
      // selectedRowKeys: [],
// loading: false,
// dataSource: [],
    }
    this.deleteButton = this.deleteButton.bind(this)
  }

  componentWillMount() {
    // This.get list()
  }

  // The component has been loaded into the dom
  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    // This.get list()
  }

  // delete
  deleteButton = (id) => {
    fetchModuleDelete({ id: id }, (result) => {
      message.success(result.msg)
      this.props.updateList()
    })
  }

  // Online and offline
  showOrHide=(id, val) => {
    fetchChangeModuleStatus({ id: id, status: val }, (result) => {
      this.props.updateList()
    })
  }

  column() {
    const self = this
    const { editButton } = self.props
    const configArr = [
      {
        title: 'Button name',
        dataIndex: 'resName',
        key: 'resName',
        width: '40%',
      },
      {
        title: 'state',
        dataIndex: 'status',
        key: 'status',
        width: '20%',
        render: (text, record, index) => {
          if (text === 1) {
            return <Badge status="warning" text="Not online" />
          }
          return <Badge status="success" text="Already online" />
        },
      },
      {
        title: 'operate',
        dataIndex: 'caozuo',
        key: 'caozuo',
        width: '40%',
        render: (text, record, index) => (
          <span>
            <Popconfirm
              title={`Sure${record.status !== 1 ? 'offline' : 'online'}the button?`}
              onConfirm={() => self.showOrHide(record.id, `${record.status}`)}
            >
              <a>{record.status !== 1 ? 'offline' : 'online'}</a>
            </Popconfirm>
            <span className="ant-divider" />
            <a onClick={() => editButton(record)}>Revise</a>
            <span className="ant-divider" />
            <Popconfirm title="delete?" onConfirm={() => self.deleteButton(record.id)}>
              <a>delete</a>
            </Popconfirm>
          </span>
        ),
      },
    ]
    return configArr
  }

  footer() {
    const { addButton } = this.props
    return (
      <div>
        <Button type="primary" onClick={addButton}>New</Button>
      </div>
    )
  }

  render() {
    const {
      visible, cancelButton, listLoading, dataSource,
    } = this.props
    // const { dataSource } = this.state
    return (
      <Drawer
        visible={visible}
        title="Module button permission list"
        onCancel={cancelButton}
        footer={this.footer()}
        size="lg"
        className="modal-header modal-body"
      >
        <div className="modalcontent">
          <TableList
            rowKey="id"
            columns={this.column()}
            dataSource={dataSource}
            loading={listLoading}
          />
        </div>
      </Drawer>
    )
  }
}
