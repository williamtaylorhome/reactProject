
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import { Menu, Button, Modal, message, Icon, Row, Col } from 'antd'
import { brandName } from '@config'
import { logout } from '@apis/common'
// import User from '@images/user.png'

import EditPassword from './modal/editPassword'
import UserInfo from './modal/userInfo'


const { confirm } = Modal

@connect((state, props) => ({
  config: state.config,
  staffResponse: state.staffResponse,
}))
export default class Header extends Component {
  // Initialize page constants and bind event methods
  constructor(props, context) {
    super(props)
    this.state = {
      loading: false,
      userInfo: false, // Control the visibility of user information pop-up boxes
      editPasswordMadalIsOpen: false,
    }
    this.handleLogout = this.handleLogout.bind(this)
  }

  // The component has been loaded into the dom
  componentDidMount() {

  }

  // Sign out
  handleLogout() {
    const { config } = this.props
    const self = this
    confirm({
      title: 'hint',
      content: 'Are you sure to log out?',
      onOk() {
        logout({}, (result) => {
          // Console.log(result)
          if (result.status === 1) {
            sessionStorage.clear()
            config.staff = {}
            hashHistory.push('/login')
          } else {
            message.warning(result.msg)
          }
        })
      },
    })
  }

  // Cancel the password change pop-up window
  cancel = () => {
    this.setState({ editPasswordMadalIsOpen: false })
  }

  // Confirm password change pop-up window
  handleOk = () => {
    this.setState({ editPasswordMadalIsOpen: false })
  }

  // Change password pop-up window displays
  editPasswordOpen = () => {
    this.setState({ editPasswordMadalIsOpen: true })
  }

  // Click to display user information
  getUserInfo() {
    this.setState({ userInfo: true })
  }

  // Click to close the user information pop-up window
  onCancel() {
    this.setState({ userInfo: false })
  }

  logoClick = () => {
    // const nav = JSON.parse(sessionStorage.getItem('gMenuList'))
// if (nav[0] && nav[0].children && nav[0].children[0].children && nav[0].children[0].children[0] && nav[0].children[0].children[0].resKey) {
//   hashHistory.push(nav[0].children[0].children[0].resKey)
//   sessionStorage.setItem('topMenuReskey', nav[0].resKey)
// }
// if (nav[0] && nav[0].children && nav[0].children[0].resKey) {
//   hashHistory.push(nav[0].children[0].resKey)
// } else {
//   hashHistory.push('/')
// }
// console.log(nav)
// hashHistory.push()
  }

  render() {
    const userinfo = JSON.parse(sessionStorage.getItem('userinfo')) || {}
    const roles = []
    userinfo && userinfo.roles && userinfo.roles.map((item) => {
      roles.push(item.roleName)
    })
    let name = ''
    if (sessionStorage.getItem('userinfo')) {
      name = JSON.parse(sessionStorage.getItem('userinfo')).chineseName
    }
    // Console.log(json.parse(session storage.get item('userinfo')))
    const userCenter = (
      <Menu className="nav-dropmenu">
        <Menu.Item key="1">
          <Icon type="caret-up" />
          <span className="label">Role: </span><span className="value" title={roles.join(',')}>{roles.join(',') || '---'}</span>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="2">
          <span className="label">Siren: </span><span className="value">{userinfo.policeCode || '---'}</span>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">
          <span className="label">Position: </span><span className="value">{userinfo.duty || '---'}</span>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="4">
          <Row>
            <Col span={12}>
              <Button type="primary" size="small" onClick={this.editPasswordOpen}>change Password</Button>
            </Col>
            <Col span={12}>
              <Button type="primary" size="small" onClick={this.handleLogout}>sign out</Button>
            </Col>
          </Row>
        </Menu.Item>
      </Menu>
    )
    const { gMenuList, topMenuReskey } = this.props
    const topKey = topMenuReskey
    return (
      <header id="navbar">
        <div id="navbar-container" className="boxed">
          <Row className="row">
            <Col span={20}>
              <div className="navbar-brand" title={brandName} onClick={this.logoClick}>
                <span className="brand-title">
                  <span className="brand-text"><span className="logo" />{brandName}</span>
                </span>
              </div>
              <nav className="topMenus hide">
                {
                  gMenuList && gMenuList.map((item, index) => (<span
                    className={item.resKey === topKey ? 'topMenu on' : 'topMenu'}
                    key={index}
                    onClick={() => this.props.topMenuClick(item, index)}
                  >{item.resName}</span>))
                }
              </nav>
            </Col>
            <Col span={4} className="col">
              <div className="right">
                <ul>
                  <li>
                    <a onClick={() => this.getUserInfo()}>{name}</a>
                  </li>
                  <li>
                    <a onClick={this.handleLogout}>quit</a>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </div>
        {
          this.state.editPasswordMadalIsOpen ?
            <EditPassword
              handleOk={this.handleOk}
              visible={this.state.editPasswordMadalIsOpen}
              onCancel={this.cancel}
            />
            : null
        }

        {
          this.state.userInfo ?
            <UserInfo
              onCancel={() => this.onCancel()}
              handleLogout={this.handleLogout}
            /> : null
        }
      </header>
    )
  }
}
