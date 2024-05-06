import React, { Component } from 'react'
import { Progress } from 'antd'

// Declare components and output them externally
export default class developing extends Component {
  // Initialize page constants and bind event methods
  constructor(props) {
    super(props)
    this.state = {
      // activeTab: 'pop' ,
    }
  }


  // The component has been loaded into the dom
  componentDidMount() {

  }


  render() {
    return (
      <div className="developing">
        <Progress
          type="circle"
          percent={100}
          format={() => 'Coming soon, please stay tuned...'}
          width={200}
          status="active"
        />
      </div>
    )
  }
}
