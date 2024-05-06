import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { Button } from 'antd'
import { connect } from 'react-redux'
// import {} from '@actions/xxx'
// import Socket from '@configs/socket'

@connect(store => ({
  // socketCollection: store.socketCollection,
}))

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
    // Socket.dispatch({ type: 'receive/hello2' })
  }

  render() {
    // const { socketCollection = {} } = this.props
    return (
      <div className="page">
        socket receive Page example
        <div>
          <h5>Data received:</h5>
          <pre>
            <code>
              {
                // JSON.stringify(socketCollection, null, 2)
              }
            </code>
          </pre>
        </div>
      </div>
    )
  }
}
