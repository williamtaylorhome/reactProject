
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Input, message } from 'antd'
import { regExpConfig } from '@reg'
import Drawer from '@components/draw/draw'
import {
  fetchModuleUpdateDetail,
  fetchModuleAdd,
} from '@apis/manage'

const FormItem = Form.Item

// Connect public constants and data methods returned by the backend and place them in props to call
// @connect((state, props) => ({
//   config: state.config,
// }))

@Form.create({})

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      // isFirst: this.props.isFirst,
    }
  }

  // The component has been loaded into the dom
  componentDidMount() {
    this.props.form.resetFields()
  }

  upDateValue = () => {
    if (this.props.pid) {
      this.props.form.setFieldsValue({
        parentid: this.props.pid,
      })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return;
      }
      values.resType = 1
      this.setState({ loading: true })
      if (this.props.type === 'modify') {
        fetchModuleUpdateDetail({ ...values, id: this.props.itemId }, (result) => {
          message.success(result.msg)
          this.setState({ loading: false }, () => {
            this.props.handleOk()
          })
          // This.props.form.reset fields()
        })
      } else {
        fetchModuleAdd(values, (result) => {
          message.success(result.msg)
          this.setState({ loading: false }, () => {
            this.props.handleOk()
          })
          // This.props.form.reset fields()
        })
      }
    });
  }

  footer() {
    const { loading } = this.state
    return (
      <div>
        <Button type="primary" onClick={this.handleSubmit} loading={loading}>Sure</Button>
        <Button onClick={this.props.onCancel}>Cancel</Button>
      </div>
    )
  }

  render() {
    const {
      visible, onCancel, title,
    } = this.props
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 17 },
    }
    return (
      <Drawer
        visible={visible}
        title={title}
        onCancel={onCancel}
        footer={this.footer()}
        className="modal-header modal-body"
      >
        <div className="modalcontent">
          <Form layout="horizontal" autoComplete="off" onSubmit={this.handleSubmit}>
            <FormItem {...formItemLayout} label="Upper level menu id" hasFeedback>
              {getFieldDecorator('parentId', {
                initialValue: this.props.pid || '',
              })(<Input disabled />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Add menu name" hasFeedback>
              {getFieldDecorator('resName', {
                rules: [
                  { required: true, message: 'Please enter a menu name' },
                ],
                initialValue: this.props.values.resName || '',
              })(<Input placeholder="Please enter a menu name" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="sort numbers" hasFeedback>
              {getFieldDecorator('sort', {
                rules: [
                  { required: true, message: 'Please enter the sorting number' },
                  { pattern: regExpConfig.num, message: 'Please enter the number' },
                ],
                initialValue: `${this.props.values.sort || '0'}`,
              })(<Input placeholder="Please enter the sorting number for the menu" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="module name" hasFeedback>
              {getFieldDecorator('resModule', {
                rules: [
                  { required: true, message: 'Please enter module name' },
                ],
                initialValue: this.props.values.resModule || '',
              })(<Input placeholder="Please enter module name" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Keywords" hasFeedback>
              {getFieldDecorator('resKey', {
                rules: [
                  { required: true, message: 'Please enter key words' },
                ],
                initialValue: `${this.props.values.resKey || ''}`,
              })(<Input placeholder="Please enter key words" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Icon name" hasFeedback>
              {getFieldDecorator('resIcon', {
                rules: [
                  {
                    required: true, message: 'Please enter the icon name',
                  },
                  { pattern: regExpConfig.isNumAlpha, message: 'Icon name format is incorrect' },
                ],
                initialValue: `${this.props.values.resIcon || ''}`,
              })(<Input placeholder="Please enter the icon name" />)}
            </FormItem>
            {/* <FormItem {...formItemLayout} label="type" hasFeedback>
              {getFieldDecorator('resType', {
                rules: [
                  { required: true, message: 'Please select a type' },
                ],
                initialValue: `${this.props.values.resType || ''}`,
              })(
                <Select placeholder="Please select type" size="large">
                  <Option value="1">Menu</Option>
                  <Option value="2">Operation address</Option>
                  <Option value="3">Page button</Option>
                </Select>
              )}
            </FormItem>*/}
          </Form>
        </div>
      </Drawer>
    )
  }
}
