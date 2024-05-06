import React, { Component } from 'react'
import { Link, hashHistory } from 'react-router'
import { Progress, Button } from 'antd'

// Declare components and output them externally
export default class notfound extends Component {
  // Initialize page constants and bind event methods
  constructor(props) {
    super(props)
    this.state = {
      // activeTab: 'pop' ,
    }
  }

  render() {
    return (
      <div className="developing notfound">
        <Progress
          type="circle"
          percent={100}
          format={() => '404'}
          width={200}
          status="active"
        />

        <div className="link ptbig">
          <p className="mbbig"><Link to="/">Jump to home page</Link></p>
          <p className="mbbig"><Link to="/login">Jump to landing page</Link></p>
          <Button type="primary" onClick={() => hashHistory.goBack()}>go back to the last page</Button>
        </div>
      </div>
    )
  }
}
