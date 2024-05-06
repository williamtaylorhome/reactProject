/*
 * @Author: 韩卿
 * @Date: 2017-08-20 16:07:21
 * @Last Modified by: dupi
 * @Last Modified time: 2018-10-22 17:10:34
 */


import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';
// import configure from '../../store/configureStore'

import './draw.less'

// const store = configure({ config: global.$GLOBALCONFIG })
// Declare components and output them externally
export default class Drawer extends Component {
  // Initialize page constants and bind event methods
  constructor(props, context) {
    super(props, context)
    this.state = {
      // activeTab: 'pop' ,
      drawTrasformClass: '',
      maskTrasformClass: '',
      drawerSizeClass: 'modal-base',
      // drawerSize ClassList: ['modal-base', 'model-sm', 'modal-lg'],
    }
  }

  componentWillMount() {
    const {
      size = 'default',
    } = this.props
    this.getDrawerSize(size)
    this.setTrasformClass()
  }


  // The component has been loaded into the dom
  componentDidMount() {
    const {
      visible = true,
    } = this.props
    if (visible) {
      this.initDrawer()
    }
  }

  // Monitor the visible attribute,
  componentWillReceiveProps(nextProps) {
    /* const {
      visible = true,
    } = this.props
    console.log(visible)
    console.log(nextProps)
    if (visible || nextProps.visible) {
      this.initDrawer()
    } else {
      this.removeDrawer()
    }*/
  }

  componentDidUpdate() {
    this.renderDrawer()
  }

  componentWillUnmount() {
    // <setTimeout></setTimeout(() => {
    ReactDOM.unmountComponentAtNode(this.popup)
    // }, 300)
  }

  // Initialize drawer
  initDrawer = () => {
    this.popup = document.createElement('div')
    this.popup.setAttribute('class', 'drawers')
    this.renderDrawer()
    document.body.appendChild(this.popup)
    this.setTrasformClass()
  }

  // Add animation effect class settings to drawer
  setTrasformClass = () => {
    const {
      visible = true,
    } = this.props
    if (visible) {
      this.setState({
        drawTrasformClass: 'draw-enter',
        maskTrasformClass: 'mask-enter',
      }, () =>
        setTimeout(() => {
          this.setState({
            drawTrasformClass: '',
            maskTrasformClass: '',
          })
        }, 300))
    }
  }

  // Remove pop-ups
  removeDrawer = () => {
    this.setState({
      drawTrasformClass: 'draw-leave',
      maskTrasformClass: 'mask-leave',
    }, () =>
      setTimeout(() => {
        this.setState({
          drawTrasformClass: '',
          maskTrasformClass: '',
        })
        document.body.removeChild(this.popup)
        ReactDOM.unmountComponentAtNode(this.popup)

        this.props.onCancel()
      }, 200))
  }

  // Determine the size class of the drawer
  getDrawerSize = (size) => {
    switch (size) {
      case 'sm':
        this.setState({
          drawerSizeClass: 'drawer-sm',
        })
        break
      case 'lg':
        this.setState({
          drawerSizeClass: 'drawer-lg',
        })
        break
      default:
        this.setState({
          drawerSizeClass: 'drawer-base',
        })
        break
    }
  }

  // Insert the pop-up window content into the specified DOM
  renderDrawer() {
    const {
      title = '标题',
      footer = null,
    } = this.props
    const {
      drawTrasformClass,
      maskTrasformClass,
      drawerSizeClass,
    } = this.state

    ReactDOM.render(
      <div className="drawer-wrap">
        <div className={`${maskTrasformClass} ant-modal-mask`} onClick={() => this.removeDrawer()} />
        <div className={`${drawTrasformClass} draw ${drawerSizeClass}`}>
          <div className="ant-modal">
            <div className="ant-modal-content">
              <button className="ant-modal-close">
                <span className="ant-modal-close-x" onClick={() => this.removeDrawer()} />
              </button>
              <div className="ant-modal-header">
                <div className="ant-modal-title">{title}</div>
              </div>
              <AntModalBody context={this.context}>
                {this.props.children}
              </AntModalBody>
              <div className="ant-modal-footer">
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>,
      this.popup,
    )
  }

  render() {
    return null
  }
}

Drawer.contextTypes = {
  form: PropTypes.object,
  vertical: PropTypes.bool,
  store: PropTypes.object,
};

class AntModalBody extends Component {
  getChildContext() {
    return { form: this.props.context.form, vertical: this.props.context.vertical, store: this.props.context.store }
  }
  render() {
    return (
      <div className="ant-modal-body">
        {this.props.children}
      </div>
    )
  }
}

AntModalBody.childContextTypes = {
  form: PropTypes.object,
  vertical: PropTypes.string,
  store: PropTypes.object,
}
