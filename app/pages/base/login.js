
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { hashHistory/* , Link*/ } from 'react-router'
import { Spin, Form, Icon, Input, Button, Row, Col, message } from 'antd'
import { regExpConfig } from '@reg'
import { brandName } from '@config'
import { clearGformCache2, login } from '@actions/common'
import { /* Login,*/staff, menu } from '@apis/common'
import Logo from '@components/logo/logo'
import md5 from 'md5'
import QueuiAnim from 'rc-queue-anim'
import axios from 'axios'

// import '@styles/base.less'
import '@styles/login.less'

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

const FormItem = Form.Item

@connect((state, props) => ({
  config: state.config,
  loginResponse: state.loginResponse,
}))
@Form.create({
  onFieldsChange(props, items) {},
})

export default class Login extends Component {
  // Initialize page constants and bind event methods
  constructor(props, context) {
    super(props)
    this.state = {
      loading: false,
      isCertificates: false,
      show: true,
    }
  }

  componentDidMount() {
    this.props.dispatch(clearGformCache2({}))
    this.props.form.setFieldsValue({ username: 'username', password: '123456' })

    // Test to cancel axios request demo1
    axios.post('http://localhost:1111/mock/usercenter/login', {
      username: 'dupi',
      password: '123',
    }, {
      cancelToken: source.token,
    }).catch((error) => {
      console.log(error)
    })
    // Cancel demo2 that has been packaged
    const res = menu({}, (response) => {}, (r) => {}, { cancelToken: source.token })

    setTimeout(() => {
      source.cancel('Cancel login request');
      res.abort('Cancel get menu request')
    }, 500);
  }

  // #region Shrink business code function

  handleSubmit(e, isCertificates) {
    e.preventDefault()
    if (isCertificates) {
      message.warning('The certificate login function is not enabled')
      return
    }
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const query = this.props.form.getFieldsValue()
        this.setState({ loading: true })
        /* if (process.env.NODE_ENV === 'production') {
          values.password = values.password
        } else {
          values.password = md5(values.password)
        }*/
        values.password = md5(values.password)
        this.props.dispatch(login(values, (res) => {
          sessionStorage.setItem('token', res.data.token)
          sessionStorage.setItem('ticket', res.data.ticket)
          menu({}, (response) => {
            const nav = response.data.list || []
            if (nav && nav[0]) {
              sessionStorage.setItem('gMenuList', JSON.stringify(nav))
              sessionStorage.setItem('topMenuReskey', nav[0].resKey)
              sessionStorage.setItem('leftNav', JSON.stringify(nav))

              staff({ usercode: query.username }, (resp) => {
                sessionStorage.setItem('userinfo', JSON.stringify(resp.data))
                hashHistory.push('/')
              }, (r) => {
                message.warning(r.msg)
                this.setState({
                  loading: false,
                })
              })
            }
          }, (r) => {
            // Message.warning(r.msg)
            this.setState({
              loading: false,
            })
          })
        }, (res) => {
          message.warning(res.msg)
          this.setState({
            loading: false,
          })
        }))
      }
    })
  }

  // #endregion

  render() {
    const { getFieldDecorator } = this.props.form
    console.log(this.props.loginResponse)
    return (
      <div className="login-container">
        <div className="extraLink" />
        <div className="flexcolumn">
          <div className="login-header" key="header">
            <div className="slogan">
              <QueuiAnim className="flexcolumn" type={['right', 'left']} key="p">
                {
                  this.state.show ? [
                    <p key="0" className="title">{brandName}
                      {/* <span className="en">BIG DATA</span>*/}
                    </p>,
                  ] : null
                }
              </QueuiAnim>
            </div>
            <Logo />
          </div>
          <div className="login-main">
            <QueuiAnim delay={300} type="bottom" key="row">
              {
                this.state.show ? [
                  <Row key="row0">
                    <Col span={8} />
                    <Col span={8}>
                      <Spin spinning={this.state.loading}>
                        <Form onSubmit={e => this.handleSubmit(e, this.state.isCertificates)}>
                          {!this.state.isCertificates ?
                            (<div>
                              <FormItem hasFeedback>
                                {getFieldDecorator('username', {
                                  rules: [
                                    {
                                      required: true, min: 4, max: 10, message: 'Username must be 4-10 characters',
                                    },
                                    { pattern: regExpConfig.policeNo, message: 'Account number consists of 4-10 digits or letters' },
                                  ],
                                })(<Input addonBefore={<Icon type="user" />} placeholder="please enter user name" type="text" />)}
                              </FormItem>
                              <FormItem hasFeedback>
                                {getFieldDecorator('password', {
                                  rules: [
                                    {
                                      required: true, min: 6, max: 16, message: 'Password is 6-16 characters',
                                    },
                                    { pattern: regExpConfig.pwd, message: 'Password consists of 6-16 digits or letters' },
                                  ],
                                })(<Input addonBefore={<Icon type="lock" />} placeholder="Please enter password" type="password" />)}
                              </FormItem>
                              <FormItem>
                                <Button type="primary" htmlType="submit" className="cert-btn">Log in</Button>
                              </FormItem>
                            </div>) :
                            <FormItem>
                              <Button type="primary" htmlType="submit">Certificate login</Button>
                            </FormItem>
                          }
                        </Form>
                      </Spin>
                    </Col>
                    <Col span={8} />
                  </Row>,
                ] : null
              }
            </QueuiAnim>
          </div>
          <QueuiAnim component="div" className="login-footer" delay={600} type="bottom" key="footer">
            {
              this.state.show ? [
                <p key="0"> Zhejiang Tangram Information Technology Co., Ltd. </p>,
              ] : null
            }

          </QueuiAnim>
        </div>
      </div>
    )
  }
}
