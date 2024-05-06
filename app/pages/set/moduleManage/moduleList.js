

import React, { Component } from 'react'
import { Table, Popconfirm } from 'antd'

export default class ModuleList extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  renderColumn() {
    const {
      onDelete, onModify, onUpdataStatus, onAddNode, buttonList,
    } = this.props
    return [
      {
        title: 'Function',
        dataIndex: 'resName',
        width: '40%',
        key: 'resName',
        render: function (text, record, index) {
          return (
            <span>{text}</span>
          )
        },
      },
      {
        title: 'operate',
        width: '40%',
        key: 'operation',
        render: (text, record, index) => (
          <span>
            <a onClick={() => onAddNode(record.id)}>New</a>
            <span className="ant-divider" />
            <a onClick={() => onModify(record.id, record.parentid)}>Revise</a>
            {
              text.children && text.children.length > 0 ?
                null :
                <span>
                  <span className="ant-divider" />
                  <Popconfirm title="delete?" onConfirm={() => onDelete(record.id)}>
                    <a>delete</a>
                  </Popconfirm>
                </span>
            }
            {
              record.resName !== 'Module management' ? (
                <span>
                  <span className="ant-divider" />
                  <Popconfirm title={`Sure${text.status ? 'show' : 'hide'}This module?`} onConfirm={() => onUpdataStatus(text.id, `${text.status ? 0 : 1}`)}>
                    <a>{text.status ? 'display module' : 'hidden module'}</a>
                  </Popconfirm>
                </span>) : null
            }
            <span className="ant-divider" />
            <a onClick={() => buttonList(record.id, record.parentid)}>Button permissions</a>
          </span>
        ),
      },
      {
        title: 'state',
        width: '20%',
        render: function (text, record, index) {
          return (
            record.resName !== 'Module management' ? (
              <span>{record.status ? <span className="error">Not online</span> : <span className="success">Already online</span>}</span>
            ) : <span className="success">Already online</span>
          )
        },
      },
    ]
  }

  render() {
    const { dataSource, loading/* , scroll */ } = this.props
    return (
      <div className="table-scrollfix">
        <Table
          columns={this.renderColumn()}
          dataSource={dataSource}
          loading={loading}
          scroll={{ y: true }}
          pagination={false}
          bordered
          rowKey="id"

        />
      </div>
    )
  }
}
