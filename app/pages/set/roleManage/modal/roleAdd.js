

import React, { Component } from 'react'
import { Button, Form, Input, /* Modal, */ Select, message } from 'antd'
import { regExpConfig } from '@reg'
import Drawer from '@components/draw/draw'
import {
  fetchRoleAdd,
  fetchRoleUpdate,
} from '@apis/manage'

const FormItem = Form.Item
const { Option } = Select


@Form.create({})

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.form.resetFields()
    this.props.form.setFieldsValue({
      roleName: this.props.value.roleName,
      sort: `${this.props.value.sort}`,
      tjFlag: this.props.value.tjFlag !== undefined ? String(this.props.value.tjFlag) : '1',
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return;
      }
      this.setState({ loading: true })
      if (this.props.type === 'modify') {
        fetchRoleUpdate({ ...values, id: this.props.modifyId }, (res) => {
          message.success(res.msg)
          this.props.handleOk(false)
        })
      } else {
        fetchRoleAdd(values, (res) => {
          message.success(res.msg)
          this.props.handleOk(false)
        })
      }
      this.setState({ loading: false })
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
    const { getFieldDecorator } = this.props.form
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
          <Form layout="horizontal" onSubmit={this.handleSubmit}>
            <FormItem {...formItemLayout} label="Role Name" hasFeedback>
              {getFieldDecorator('roleName', {
                rules: [
                  { required: true, message: 'Please enter a role name' },
                  // { pattern: regExpConfig.isNormalEncode, message: 'Please enter non-special characters' },
                ],
              })(<Input placeholder="Please enter a role name" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Role sorting" hasFeedback>
              {getFieldDecorator('sort', {
                rules: [
                  { required: true, message: 'Please enter the sorting number' },
                  { pattern: regExpConfig.num, message: 'Please enter the number' },
                ],
              })(<Input placeholder="Please enter the role order" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Whether to count" hasFeedback>
              {getFieldDecorator('tjFlag', {
                initialValue: '1',
                rules: [
                  { required: true, message: 'Please select whether to count' },
                ],
              })(<Select placeholder="Choose whether to count">
                <Option value="0">no</Option>
                <Option value="1">yes</Option>
              </Select>)}
            </FormItem>
            <Button className="hide" type="primary" htmlType="submit">Sure</Button>
          </Form>
        </div>
      </Drawer>
    )
  }
}

