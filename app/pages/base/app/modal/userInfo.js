import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Button, Input, message } from 'antd'
import { regExpConfig } from '@configs/regular.config'
import Drawer from '@components/draw/draw'
import md5 from 'md5'
import { updatePwd } from '@apis/common' // change password api
import '@styles/personalCenter.less'

const FormItem = Form.Item
@connect((state, props) => ({
  config: state.config,

}))
@Form.create({
  onFieldsChange(props, items) {
    // console.log(props)
// console.log(items)
// props.cacheSearch(items);
  },
})

export default class userInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pswFlag: false, // Modify button box to hide
      submitLoading: false, // Change password and submit loading
    }
    // this.checkOldPassword = this.checkOldPassword.bind(this)
    this.checkNewPassword = this.checkNewPassword.bind(this)
    // this.checkRepeatPassword = this.checkRepeatPassword.bind(this)
  }
  // Change password Confirm original password
// checkOldPassword(rule, value, callback) {
//   const oldPwd = JSON.parse(sessionStorage.getItem('userinfo')).password
//   const form = this.props.form
//   if (value && value !== oldPwd) {
//     callback('Please enter the correct password')
//   } else {
//     callback()
//   }
// }
// Is the original password a duplicate of the new password?
// checkRepeatPassword(rule, value, callback) {
//   const form = this.props.form
//   console.info(value, 'than', form.getFieldValue('oldPass'))
//   if (value && value === form.getFieldValue('oldPass')) {
//     callback('The original password and the modified password cannot be consistent')
//   } else {
//     callback()
//   }
// }
// Change password Confirm new password
  checkNewPassword(rule, value, callback) {
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
      callback('The two password inputs are inconsistent')
    } else {
      callback()
    }
  }
  // Submit after changing password
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        console.log('Received values of form: ', values);
        return
      }
      this.setState({ submitLoading: true })
      let p = md5(values.password)
      let o = md5(values.oldPass)

      // if (process.env.NODE_ENV === 'production') {
//   p = values.password
//   o = values.oldPass
// } else {
      p = md5(values.password)
      o = md5(values.oldPass)
      // }
      updatePwd(
        {
          password: p,
          oldPassword: o,
        }, (res) => {
          message.info(res.msg)
          this.setState({ submitLoading: false })
        },
        (res) => {
          message.error(res.msg)
          this.setState({ submitLoading: false })
        },
      )
    })
  }

  // Drawer bottom button information
  footer() {
    return (
      <div>
        <div className="gout-btn"><Button type="primary" onClick={this.props.handleLogout}>quit</Button></div>
      </div>
    )
  }
  render() {
    const userinfo = JSON.parse(sessionStorage.getItem('userinfo'))
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 16 },
    };
    let roles = ''
    userinfo && userinfo.roles.map((item, index) => {
      roles += `${item.roleName}，`
    })
    roles = roles.substring(0, roles.length - 1)
    return (
      <Drawer
        visible
        className="drawer-sm"
        title="User Info"
        onCancel={this.props.onCancel}
        footer={this.footer()}
      >
        <div className="user">
          <div className="user-img"><img src="" alt="" /></div>
          <div className="user-info">
            <ul>
              <li><span>Name</span><b>{userinfo.chineseName}</b></li>
              <li><span>Phone number</span><b>{userinfo.phoneNo}</b></li>
              <li><span>cornet</span><b>{userinfo.shortPhoneNo}</b></li>
              <li><span>unit</span><b>{userinfo.deptName}</b></li>
              <li><span>Position</span><b>{userinfo.post}</b></li>
              <li><span>user role</span><b>{roles}</b></li>
              <li className="changePsw_in"><span>change Password</span><i className="enter" onClick={() => this.setState({ pswFlag: true })}>Revise</i></li>
              {this.state.pswFlag ?
                <div className="changePswWrap">
                  <div className="changePsw">
                    <div className="changePsw_title">change Password</div>
                    <Form layout="horizontal" onSubmit={this.handleSubmit}>
                      <FormItem {...formItemLayout} label="old password" hasFeedback>
                        {getFieldDecorator('oldPass', {
                          initialValue: '',
                          rules: [{ required: true, message: 'Please enter the original password' },
                            { pattern: regExpConfig.pwd, message: 'Password consists of 6-16 digits or letters' },
                          ],
                        })(<Input placeholder="Please enter the original password" type="password" />)}
                      </FormItem>
                      <FormItem {...formItemLayout} label="New Password" hasFeedback>
                        {getFieldDecorator('password', {
                          initialValue: '',
                          rules: [{ required: true, message: 'Please enter a new password' },
                            { pattern: regExpConfig.pwd, message: 'Password consists of 6-16 digits or letters' },
                            { validator: this.checkRepeatPassword },
                          ],
                        })(<Input placeholder="Please enter a new password" type="password" />)}
                      </FormItem>
                      <FormItem {...formItemLayout} label="Confirm the new password" hasFeedback>
                        {getFieldDecorator('checkPass', {
                          initialValue: '',
                          rules: [{ required: true, message: 'Confirm the new password' },
                            { validator: this.checkNewPassword },
                          ],
                        })(<Input placeholder="Confirm the new password" type="password" />)}
                      </FormItem>
                      <div className="changePsw_btngroup">
                        <Button type="primary" htmlType="submit" loading={this.state.submitLoading}>Sure</Button>
                        <Button type="defalut" htmlType="reset" onClick={() => this.setState({ pswFlag: false })}>Cancel</Button>
                      </div>
                    </Form>
                  </div>
                </div>
                : ''}
            </ul>
          </div>
        </div>
      </Drawer>
    )
  }
}
