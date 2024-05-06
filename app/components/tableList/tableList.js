/*
 If you want to use a non-wrapping table, you must set the className of the table to nowrap, and you cannot set a specific width for td, and the X value of scroll={{ y: true, x: true }} must be true
*/

import React, { Component } from 'react'
import { Table, Pagination } from 'antd'

export default class TableList extends Component {
  componentDidMount() {
    this.tableWidthAdaptive()
  }

  componentWillUnmount() {
    clearInterval(this.t)
  }

  // Dynamically calculate the width of td
  tableWidthAdaptive = () => {
    if (this.props.className && this.props.className.indexOf('nowrap') > -1) {
      this.t = setInterval(() => { // Use a timer loop to see if the real node is loaded into the dom
        const tds = document.querySelector('.ant-table-row') && document.querySelector('.ant-table-row').querySelectorAll('td')
        const ths = document.querySelectorAll('.ant-table-header th')
        if (tds && tds.length) {
          clearInterval(this.t)
          for (let i = 0; i < tds.length; i += 1) {
            const tdw = tds[i].offsetWidth
            const thw = ths[i].offsetWidth
            const w = (tdw > thw) ? tdw : thw
            tds[i].style.minWidth = `${w}px`
            ths[i].style.minWidth = `${w}px`
          }
        }
      }, 100)
    }
  }

  render() {
    const {
      currentPage,
      pageSize,
      totalCount,
      onShowSizeChange,
      onChange,
      columns,
    } = this.props
    const hasMultiHead = columns.filter(one => !!one.children).length > 0
    return (
      <div className={`table-content ${hasMultiHead ? 'clear-overlap-border' : ''}`}>
        <Table
          pagination={false}
          bordered
          rowKey="id"
          // Row class name={this.props.row class name}
          {...this.props}
        />
        { currentPage ?
          <Pagination
            total={totalCount || 0}
            showSizeChanger // Is it possible to change page size
            showQuickJumper={false}// Is it possible to jump to a certain page quickly?
            onShowSizeChange={onShowSizeChange}
            onChange={onChange}
            showTotal={_totalCount => `共 ${_totalCount} 条`}
            current={currentPage || 1}
            pageSize={pageSize || 10}
            {...this.props}
          /> : null
        }
      </div>
    )
  }
}
