import React, { Component } from 'react';
// import { connect } from 'react-redux'
import { Button, Layout, message } from 'antd';
// import { hashHistory } from 'react-router'
import {
  fetchModuleList, // Get module list
  fetchModuleDelete, // Delete module
  fetchModuleDetail, // Get module details
  fetchChangeModuleStatus, // Modify module details
  fetchModuleUpdateDetail, // Modify module details
  fetchModuleAdd, // New module
  fetchButtonList, // Button permission list
} from '@apis/manage'
import '@styles/set.less'

import ModuleList from './moduleList'
import ModuleModal from './modal/moduleAdd' // New modification module
import ButtonModal from './modal/buttonModal' // Button permission list
import AddButtonModal from './modal/addButtonModal' // Added permission to modify button

const { Content } = Layout

// Declare components and output them externally
export default class userManage extends Component {
  // Initialize page constants and bind event methods
  constructor(props) {
    super(props)
    this.state = {
      title: 'New menu',
      pid: '',
      itemId: '',
      type: '',
      values: {
        id: '',
        key: '',
        module: '',
        name: '',
        sort: '',
        type: '',
      },
      moduleDetailResult: {
        id: '',
        key: '',
        module: '',
        name: '',
        sort: '',
        type: '',
      },
      Visible: false,
      buttonVisible: false,
      addButtonVisible: false,
      buttonEditState: '', // Whether the button is in the modified or added state
      butttonListLoading: false, // Button list loading status
      buttonEditData: {},
      buttonDataSource: [], // Button list data
      tableListLoading: false, // Table list loading status
      tableDataSource: [], // table list list data
    };
    this.moduleAdd = this.moduleAdd.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleModify = this.handleModify.bind(this);
    this.handleAddNode = this.handleAddNode.bind(this);
    this.handleChangeStatus = this.handleChangeStatus.bind(this);
    this.buttonList = this.buttonList.bind(this);
    this.addButton = this.addButton.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleAddCancel = this.handleAddCancel.bind(this);
    this.cancelButton = this.cancelButton.bind(this);
    this.editButton = this.editButton.bind(this);
  }

  // The component has been loaded into the dom
  componentWillMount() {
    // Make a judgment. If you are a super administrator, the module management permissions will be displayed.
    if (!(sessionStorage.getItem('roleName') === '0')) {
      // if (!(sessionStorage.getItem('roleName') === 'Super Administrator' && sessionStorage.getItem('usercode') === 'admin')) {
// hashHistory.goBack()
// return
    }
    this.getTableList();
  }

  // Delete module
  handleDelete(id) {
    fetchModuleDelete({ id: id }, (result) => {
      message.success(result.msg);
      this.getTableList();
    });
  }

  // Modify module
  handleModify(id, parentid) {
    fetchModuleDetail({ id: id }, (result) => {
      this.setState({
        Visible: true,
        title: 'Modify menu',
        pid: parentid,
        itemId: id,
        type: 'modify',
      });
    });
  }

  // Change module status
  handleChangeStatus(id, val) {
    fetchChangeModuleStatus({ id: id, status: val }, (result) => {
      this.getTableList();
    });
  }

  // New module
  moduleAdd() {
    this.setState({
      Visible: true,
      title: 'New menu',
      pid: '',
      type: 'add',
    });
  }

  // Add new module submenu
  handleAddNode(id) {
    this.setState({
      Visible: true,
      title: 'Add submenu',
      pid: id,
      type: 'add',
    });
  }

  // Called after the form is saved
  handleOk() {
    this.getTableList();
    this.setState({ Visible: false });
  }

  // Hide new modification window
  handleCancel() {
    this.setState({ Visible: false, type: 'add' })
  }

  // Show button permissions window
  buttonList(id, parentid) {
    this.setState({
      buttonVisible: true, pid: parentid, itemId: id,
    }, () => {
      this.getButtonList()
    })
  }

  // Close button permission list
  cancelButton() {
    this.setState({
      buttonVisible: false,
    })
  }

  // Add button permissions
  addButton() {
    this.setState({
      buttonEditState: 'add',
      addButtonVisible: true,
      title: 'Add button permissions',
    })
  }

  // Add and modify button permissions
  handleAdd(params) {
    if (this.state.buttonEditState !== 'add') {
      fetchModuleUpdateDetail({ ...params, parentId: this.state.itemId }, (result) => {
        message.success(result.msg)
        this.handleAddCancel()
      })
    } else {
      fetchModuleAdd({ ...params, parentId: this.state.itemId }, (result) => {
        message.success(result.msg)
        this.handleAddCancel()
      })
    }
  }

  // Cancel save
  handleAddCancel() {
    this.setState({
      addButtonVisible: false,
      buttonEditData: {},
    }, () => {
      this.getButtonList()
    })
  }

  // Modify button data
  editButton(params) {
    this.setState({
      buttonEditState: 'edit',
      buttonEditData: params,
      addButtonVisible: true,
      title: 'Modify button permissions',
    })
  }

  getButtonList = () => {
    this.setState({
      butttonListLoading: true,
    }, () => {
      fetchButtonList({ id: this.state.itemId }, (result) => {
        this.setState({
          butttonListLoading: false,
          buttonDataSource: result.data.list,
        })
      })
    })
  }
  getTableList() {
    this.setState({
      tableListLoading: true,
    }, () => {
      fetchModuleList({}, (result) => {
        this.setState({
          tableListLoading: false,
          tableDataSource: result.data.list,
        })
      })
    })
  }


  footer() {
    return (
      <div>
        <Button type="primary">Sure</Button>
        <Button>Cancel</Button>
      </div>
    )
  }

  render() {
    const {
      buttonEditState, buttonEditData, butttonListLoading, buttonDataSource, tableListLoading, tableDataSource, moduleDetailResult,
    } = this.state
    const thevalue = this.state.type === 'modify' ? moduleDetailResult : this.state.values
    return (
      <div className="page page-scrollfix page-usermanage page-modulemanage">
        <Layout>
          <Layout className="page-body">
            <Content>
              {/* <div className="page-header">
                <div className="text-right">
                  <Button type="primary" onClick={this.moduleAdd} > New module</Button>
                </div>
              </div>*/}
              <div className="page-content">
                <ModuleList
                  dataSource={tableDataSource}
                  loading={tableListLoading}
                  // scroll={{ y: global.$GLOBALCONFIG.PAGEHEIGHT -165 }}
                  onDelete={this.handleDelete}
                  onModify={this.handleModify}
                  onUpdataStatus={this.handleChangeStatus}
                  onAddNode={this.handleAddNode}
                  buttonList={this.buttonList}
                />
              </div>
              <div className="page-footer">
                <div className="page-footer-buttons">
                  <Button type="primary" onClick={this.moduleAdd} > New module</Button>
                </div>
              </div>
            </Content>
          </Layout>
        </Layout>
        {
          this.state.Visible ?
            <ModuleModal
              handleOk={this.handleOk}
              visible={this.state.Visible}
              title={this.state.title}
              pid={this.state.pid}
              itemId={this.state.itemId}
              values={thevalue}
              type={this.state.type}
              onCancel={this.handleCancel}
            />
            : null
        }
        {
          this.state.buttonVisible ?
            <ButtonModal
              visible={this.state.buttonVisible}
              pid={this.state.pid}
              itemId={this.state.itemId}
              addButton={this.addButton}
              cancelButton={this.cancelButton}
              editButton={this.editButton}
              listLoading={butttonListLoading}
              dataSource={buttonDataSource}
              updateList={() => { this.getButtonList() }}
            />
            : null
        }
        {
          this.state.addButtonVisible ?
            <AddButtonModal
              title={this.state.title}
              visible={this.state.addButtonVisible}
              onCancel={this.handleAddCancel}
              handleAdd={this.handleAdd}
              state={buttonEditState}
              buttonEditData={buttonEditData}
            />
            : null
        }
      </div>
    )
  }
}
