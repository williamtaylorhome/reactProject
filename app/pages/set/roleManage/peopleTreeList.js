
import React, { Component } from 'react'
import TableList from '@tableList'

export default class app extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount() {}

  componentDidMount() {
  }

  // #region Shrink business code function

  columns() {
    return (
      [{
        title: 'Function',
        dataIndex: 'resName',
        key: 'resName',
        width: '30%',
      }, {
        title: 'Selected module',
        dataIndex: 'checkedArr',
        key: 'checkedArr',
        width: '40%',
      }]
    )
  }

  // #endregion

  render() {
    const {
      dataSource,
    } = this.props
    return (
      <div className="flexcolumn roleModuleList">
        <TableList
          rowKey="id"
          columns={this.columns()}
          dataSource={dataSource}
          scroll={{ y: true }}
          indentSize={30}
        />
      </div>
    )
  }
}
