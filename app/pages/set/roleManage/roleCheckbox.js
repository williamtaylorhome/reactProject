import { Checkbox } from 'antd';
import React from 'react';

class RoleCheckbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
    };
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    this.setState({
      isChecked: this.props.defaultChecked,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.defaultChecked !== nextProps.defaultChecked) {
      this.setState({
        isChecked: nextProps.defaultChecked,
      });
    }
  }

  // #region Shrink business code function

  onChange(e) {
    const item = this.props.checkItem;
    this.setState({
      isChecked: e.target.checked,
    });
    this.props.onChecked(item, e.target.checked);
  }

  // #endregion

  render() {
    return (
      <Checkbox
        checked={this.state.isChecked}
        onChange={this.onChange}
        disabled={this.props.checkItem.resName === 'workbench'}
      >
        {this.state.isChecked ? 'already opened' : 'nonactivated'}
      </Checkbox>
    );
  }
}
export default RoleCheckbox;
