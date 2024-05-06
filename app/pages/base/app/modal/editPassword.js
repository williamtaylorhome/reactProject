import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Input, /* Select,*/ Modal, Row, Col, message } from 'antd'
import { regExpConfig } from '@reg'
import md5 from 'md5'
import {
  fetchPassword,
} from '@actions/common'

const FormItem = Form.Item
// const Option = Select.Option
// Connect public constants and data methods returned by the backend and place them in props to call
@connect((state, props) => ({
  config: state.config,
}))

@Form.create({})

export default class index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      confirmDirty: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.checkConfirm = this.checkConfirm.bind(this)
    this.checkPassword = this.checkPassword.bind(this)
  }


  // The component has been loaded into the dom
  componentDidMount() {

  }

  // Submit form data
  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFields((errors, fieldsValue) => {
      if (errors) {
        return
      }

      if (fieldsValue.password) {
        // if (process.env.NODE_ENV === 'production') {
//   fieldsValue.password = fieldsValue.password
// } else {
        fieldsValue.password = md5(fieldsValue.password)
        // }
      }
      const values = {
        oldPwd: fieldsValue.oldPwd ? fieldsValue.oldPwd : '',
        password: fieldsValue.password ? fieldsValue.password : '',
      };
      this.submitLoading = true
      this.props.dispatch(fetchPassword({
        ...values,
      }, (res) => {
        message.success(res.msg)
        this.submitLoading = false
        this.setState({})
        this.props.onCancel()
      }, (res) => {
        message.warning(res.msg)
        this.props.form.setFields({ oldPwd: '', password: '', confirm: '' })
        this.submitLoading = false
        this.setState({})
      }))

      // This.props.form.reset fields()
    });
  }

  checkPassword = (rule, value, callback) => {
    const { form } = this.props
    if (value && value !== form.getFieldValue('password')) {
      callback('The passwords entered twice are inconsistent')
    } else {
      callback()
    }
  }

  checkConfirm = (rule, value, callback) => {
    const { form } = this.props
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
  }

  // Pop-up footer
  renderFooter() {
    return (
      <div>
        <Button type="primary" size="large" onClick={this.handleSubmit} loading={this.submitLoading}>Sure</Button>
        <Button size="large" onClick={this.props.onCancel}>Cancel</Button>
      </div>
    )
  }

  render() {
    // const { imageUrl } = this.state
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 },
      hasFeedback: true,
    }
    return (
      <Modal
        className=""
        visible={this.props.visible}
        title="change Password"
        onCancel={this.props.onCancel}
        footer={this.renderFooter()}
      >
        <div className="modalcontent">
          <Form layout="horizontal" autoComplete="off">
            <Row>
              <Col span="24">
                <FormItem {...formItemLayout} label="old password">
                  {getFieldDecorator('oldPwd', {
                    rules: [
                      { required: true, message: 'Please enter your password!' },
                      { pattern: regExpConfig.pwd, message: 'Please enter 6-16 digits or letters!' },
                      { validator: this.checkConfirm },
                    ],
                    // validateTrigger: 'onBlur',
                  })(<Input type="password" placeholder="Please enter password" />)}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="24">
                <FormItem {...formItemLayout} label="New Password">
                  {getFieldDecorator('password', {
                    rules: [
                      { required: true, message: 'Please enter your password!' },
                      { pattern: regExpConfig.pwd, message: 'Please enter 6-16 digits or letters!' },
                      { validator: this.checkConfirm },
                    ],
                    // validateTrigger: 'onBlur',
                  })(<Input type="password" placeholder="Please enter password" />)}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="24">
                <FormItem {...formItemLayout} label="Confirm the new password">
                  {getFieldDecorator('confirm', {
                    rules: [
                      { required: true, message: 'Please enter your password!' },
                      { pattern: regExpConfig.pwd, message: 'Please enter 6-16 digits or letters!' },
                      { validator: this.checkPassword },
                    ],
                    // validateTrigger: 'onBlur',
                  })(<Input type="password" placeholder="Please enter password" />)}
                </FormItem>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>
    )
  }
}
