import React, { Component } from 'react';
import { Button, Form, Input } from 'antd';
import { connect } from 'react-redux';
import { regExpConfig } from '@reg';
import Drawer from '@components/draw/draw';

const FormItem = Form.Item;


// @connect((state, props) => ({
//   config: state.config
// }))
@Form.create()

// Declare components and output them externally
export default class Pop extends Component {
  // Initialize page constants and bind event methods
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.props.form.resetFields();
  }

  // The component has been loaded into the dom
  componentDidMount() {}

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return;
      }
      values.resType = 3;
      if (this.props.state === 'edit') {
        values.id = this.props.buttonEditData.id;
      }
      this.props.handleAdd(values);
    });
  }

  footer() {
    const { onCancel } = this.props;
    return (
      <div>
        <Button type="primary" onClick={this.handleSubmit}>
          Sure
        </Button>
        <Button onClick={onCancel}>Cancel</Button>
      </div>
    );
  }

  render() {
    const { visible, onCancel, title, buttonEditData } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 17 },
    };
    return (
      <Drawer
        visible={visible}
        title={title}
        onCancel={onCancel}
        footer={this.footer()}
        className="modal-header modal-body"
      >
        <div className="modalcontent">
          <Form
            layout="horizontal"
            autoComplete="off"
            onSubmit={this.handleSubmit}
          >
            {/* <FormItem {...formItemLayout} label="parent menu id" hasFeedback>
              {getFieldDecorator('parentId', {
                initialValue: this.props.pid || '',
              })(
                <Input disabled />
                )}
            </FormItem>*/}
            <FormItem {...formItemLayout} label="Add button name" hasFeedback>
              {getFieldDecorator('resName', {
                rules: [{ required: true, message: 'Please enter a button name' }],
                initialValue: buttonEditData.resName || '',
              })(<Input placeholder="Please enter a button name" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="sort numbers" hasFeedback>
              {getFieldDecorator('sort', {
                rules: [
                  { required: true, message: 'Please enter the sorting number' },
                  { pattern: regExpConfig.num, message: 'Please enter the number' },
                ],
                initialValue: `${buttonEditData.sort || '0'}`,
              })(<Input placeholder="Please enter the sorting number for the menu" />)}
            </FormItem>
            {/* <FormItem {...formItemLayout} label="module name" hasFeedback>
              {getFieldDecorator('resModule', {
                rules: [
                  { required: true, message: 'Please enter the module name' },
                ],
                initialValue: buttonEditData.resModule || '',
              })(
                <Input placeholder="Please enter the module name" />
                )}
            </FormItem>*/}
            <FormItem {...formItemLayout} label="Keywords" hasFeedback>
              {getFieldDecorator('resKey', {
                rules: [{ required: true, message: 'Please enter key words' }],
                initialValue: `${buttonEditData.resKey || ''}`,
              })(<Input placeholder="Please enter key words" />)}
            </FormItem>
            {/* <FormItem {...formItemLayout} label="icon name" hasFeedback>
              {getFieldDecorator('resIcon', {
                rules: [
                  {
                    required: true, message: 'Please enter the icon name',
                  },
                  { pattern: regExpConfig.isNumAlpha, message: 'The icon name format is incorrect' },
                ],
                initialValue: `${this.props.values.resIcon || ''}`,
              })(
                <Input placeholder="Please enter the icon name" />
                )}
            </FormItem>
            <FormItem {...formItemLayout} label="type" hasFeedback>
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
    );
  }
}
