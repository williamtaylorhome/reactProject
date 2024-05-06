
import React, { Component } from 'react'
import { Button, Form, Input, message, Select } from 'antd'
import { regExpConfig } from '@reg'
import Drawer from '@components/draw/draw'
import {
  fetchUserDetailUpdate,
  fetchUserAdd,
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

  // The component has been loaded into the dom
  componentDidMount() {
    this.props.form.resetFields()
  }


  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return;
      }
      this.setState({ loading: true }, () => {
        if (this.props.type === 'edit') {
          fetchUserDetailUpdate({ ...values, deptCode: this.props.deptId, id: this.props.currPeopleId }, (res) => {
            message.success(res.msg)
            this.state.loading = false
            this.props.handleOk()
          }, (errorRes) => {
            message.warning(errorRes.msg)
            this.setState({ loading: false })
          })
        } else {
          fetchUserAdd({ ...values, deptCode: this.props.deptId }, (res) => {
            message.success(res.msg)
            this.state.loading = false
            this.props.handleOk()
          }, (errorRes) => {
            message.warning(errorRes.msg)
            this.setState({ loading: false })
          })
        }
      })
    })
  }

  footer() {
    return (
      <div>
        <Button type="primary" onClick={this.handleSubmit} loading={this.state.loading}>Sure</Button>
        <Button onClick={this.props.onCancel}>Cancel</Button>
      </div>
    )
  }

  render() {
    const {
      visible, onCancel, title, roleList, values,
    } = this.props
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 17 },
    };
    (values.roleIds || []).map((item, index) => (values.roleIds.splice(index, 1, String(item))));
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
            <FormItem {...formItemLayout} label="name" hasFeedback>
              {getFieldDecorator('chineseName', {
                initialValue: values.chineseName || '',
                rules: [{ required: true, message: 'Please enter name' }],
              })(<Input placeholder="Please enter name" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="ID card" hasFeedback>
              {getFieldDecorator('idcardNo', {
                initialValue: values.idcardNo || '',
                rules: [
                  { required: true, message: 'Please enter identification number' },
                  { pattern: regExpConfig.IDcard, message: 'The ID number format is incorrect' },
                ],
              })(<Input placeholder="Please enter identification number" disabled={this.props.type === 'edit'} />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Siren" hasFeedback>
              {getFieldDecorator('policeCode', {
                initialValue: values.policeCode || '',
                rules: [
                  // { required: true, message: 'Please enter the police number' },
// { pattern: regExpConfig.policeNo, message: 'Please enter 4-10 digits or letters' },
                ],
              })(<Input placeholder="Please enter the police number" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Login user name" hasFeedback>
              {getFieldDecorator('username', {
                initialValue: values.username || '',
                rules: [
                  { required: true, message: 'Please enter 4-10 digits or letters' },
                  { pattern: regExpConfig.policeNo, message: 'Please enter 4-10 digits or letters' },
                ],
              })(<Input placeholder="Please enter your login username" disabled={this.props.type === 'edit'} />)}
            </FormItem>
            <FormItem style={{ position: 'absolute', zIndex: -10 }} ><input type="password" /></FormItem>
            {
              this.props.type === 'edit' ? (
                <FormItem {...formItemLayout} label="change Password">
                  {getFieldDecorator('password', {
                    initialValue: values.password || '',
                    rules: [{ pattern: regExpConfig.pwd, message: 'Please enter 6-16 digits or letters' }],
                  })(<Input type="password" placeholder="This field is empty if you do not want to change the password." />)}
                </FormItem>
              ) : (
                <FormItem {...formItemLayout} label="login password" hasFeedback>
                  {getFieldDecorator('password', {
                    initialValue: values.password || '',
                    rules: [
                      { required: true, message: 'Please enter 6-16 digits or letters for password' },
                      { pattern: regExpConfig.pwd, message: 'Please enter 6-16 digits or letters for password' },
                    ],
                  })(<Input placeholder="Please enter password" type="password" />)}
                </FormItem>
              )
            }
            <FormItem {...formItemLayout} label="phone number" hasFeedback>
              {getFieldDecorator('phoneNo', {
                initialValue: values.phoneNo || '',
                rules: [
                  { required: true, message: 'Please enter the phone number' },
                  { pattern: regExpConfig.mobile, message: 'Mobile phone number format is incorrect' },
                ],
              })(<Input placeholder="Please enter the phone number" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Mobile short number" hasFeedback>
              {getFieldDecorator('shortPhoneNo', {
                initialValue: values.shortPhoneNo || '',
              })(<Input placeholder="Please enter your mobile phone number" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Position" hasFeedback>
              {getFieldDecorator('post', {
                initialValue: values.post || '',
              })(<Input placeholder="Please enter job title" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Role" hasFeedback>
              {getFieldDecorator('roleIds', {
                initialValue: values.roleIds || [],
                rules: [
                  { required: true, message: "Please select the user's role" },
                ],
              })(<Select
                mode="multiple"
                placeholder="Please select the user's role"
                showSearch
              >
                {
                  roleList.map(item => <Option key={item.roleName} value={`${item.id}`}>{item.roleName}</Option>)
                }
              </Select>)}
            </FormItem>
            <Button className="hide" type="primary" htmlType="submit">Sure</Button>
          </Form>
        </div>
      </Drawer>
    )
  }
}
