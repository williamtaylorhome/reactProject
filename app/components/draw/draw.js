
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
// import { Provider } from 'react-redux'
import PropTypes from 'prop-types';
// import { Form } from 'antd'
// import configure from '../../store/configureStore'

import './draw.less'

// const store = configure({ config: global.$GLOBALCONFIG })
// @Form.create({})
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
    document.body.classList.add('body-drawer')
  }


  // The component has been loaded into the dom
  componentDidMount() {
    const {
      visible = true,
    } = this.props
    if (visible) {
      this.initDrawer()
    }
    const {
      size = 'default',
    } = this.props
    this.getDrawerSize(size)
    this.setTrasformClass()
  }

  // Monitor the visible attribute,
  componentWillReceiveProps(nextProps) {

  }

  componentDidUpdate() {
    const {
      visible = true,
    } = this.props
    if (visible) {
      this.renderDrawer()
    }
  }

  componentWillUnmount() {
    this.renderDrawer({
      drawTrasformClass: 'draw-leave',
      maskTrasformClass: 'mask-leave',
    })
    setTimeout(() => {
      // Document.body.remove child(this.popup)
      document.body.classList.remove('body-drawer')
      ReactDOM.unmountComponentAtNode(this.popup)
    }, 300) // The component is about to be uninstalled, perform animation and then uninstall it.
  }

  // Initialize drawer
  initDrawer = () => {
    this.popup = document.createElement('div')
    this.popup.setAttribute('class', 'drawers')
    document.body.appendChild(this.popup)
    this.renderDrawer()
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
      }, () => {
        setTimeout(() => {
          this.setState({
            drawTrasformClass: '',
            maskTrasformClass: '',
          })
        }, 300)
      })
    }
  }

  // Remove pop-ups
  removeDrawer = () => {
    this.setState({
      drawTrasformClass: 'draw-leave',
      maskTrasformClass: 'mask-leave',
    }, () => {
      setTimeout(() => {
        this.setState({
          drawTrasformClass: '',
          maskTrasformClass: '',
        })
        document.body.removeChild(this.popup)
        document.body.classList.remove('body-drawer')
        ReactDOM.unmountComponentAtNode(this.popup)
        this.props.onCancel()
      }, 250)
    })
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
  renderDrawer(_class = {}) {
    const {
      title = '标题',
      footer = null,
    } = this.props
    const {
      // drawTrasformClass,
// maskTrasformClass,
      drawerSizeClass,
    } = this.state

    // Prioritize the use of self-defined class animations
    const drawTrasformClass = _class.drawTrasformClass || this.state.drawTrasformClass
    const maskTrasformClass = _class.maskTrasformClass || this.state.maskTrasformClass

    ReactDOM.render(
      <div className="drawer-wrap">
        <div className={`${maskTrasformClass} ant-modal-mask`} onClick={() => this.removeDrawer()} />
        <div className={`${drawTrasformClass} draw ${drawerSizeClass} ${this.props.className}`}>
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
              {
                footer ?
                  <div className="ant-modal-footer">
                    {footer}
                  </div> : null
              }
            </div>
          </div>
        </div>
      </div>,
      this.popup,
    )
  }

  render() {
    // const {
//   title = '标题',
//   footer = null,
// } = this.props
// const {
//   drawTrasformClass,
//   maskTrasformClass,
//   drawerSizeClass,
// } = this.state
    return (
      // <div className="drawer-wrap">
//   <div className={`${maskTrasformClass} ant-modal-mask`} onClick={() => this.removeDrawer()} />
//   <div className={`${drawTrasformClass} draw ${drawerSizeClass}`}>
//     <div className="ant-modal">
//       <div className="ant-modal-content">
//         <button className="ant-modal-close">
//           <span className="ant-modal-close-x" onClick={() => this.removeDrawer()} />
//         </button>
//         <div className="ant-modal-header">
//           <div className="ant-modal-title">{title}</div>
//         </div>
//         <div className="ant-modal-body">
//           {this.props.children}
//         </div>
//         <div className="ant-modal-footer">
//           {footer}
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
      null
    )
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
