import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { Button } from 'antd'
// import {connect} from 'react-redux'
// import {} from '@actions/xxx'
// import Socket from '@configs/socket'
// @connect((storeState)=>({}))

export default class app extends Component {
  static defaultProps = {
  }

  static propTypes = {
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() { }

  // #region vscode 1.17’s shrink code block function business code


  // #endregion

  // Send socket data
  onClickSend = () => {
    // Socket.send({ type: 'receive/hello3', data: { name: 'dupi' } })
  }

  render() {
    return (
      <div className="page">
        Demonstration page
        <div>
          <Button onClick={this.onClickSend}>send</Button>
        </div>
      </div>
    )
  }
}
