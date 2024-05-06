import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Spin,
  Button,
  Popconfirm,
  Form,
  Input,
  Layout,
  Radio,
  Icon,
  message,
} from 'antd';
import TableList from '@tableList';
// import { hashHistory } from 'react-router'
import { menu } from '@apis/common';
import {
  fetchRoleList,
  fetchRoleDetail,
  fetchRoleDelete,
  fetchModuleListInRole,
  // Fetch rloe res,
  fetchUpdateRoleRes,
  fetchUserList,
  fetchRoleDeletePeople,
  fetchUpdateButton,
  fetchTreeList,
} from '@apis/manage';
import RolesList from './roleList';
import RolesModule from './roleModuleList';
import PeopleTree from './peopleTreeList';
import RoleEditModal from './modal/roleAdd';
import ButtonModal from './modal/buttonModal'; // Button permission list

const FormItem = Form.Item;
const { Content, Sider } = Layout;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;

// Connect public constants and data methods returned by the backend and place them in props to call
// @connect((state, props) => ({
//   config: state.config,
// }))

@Form.create({})

// Declare components and output them externally
export default class app extends Component {
  // Initialize page constants and bind event methods
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'stepTree',
      Visible: false,
      title: '',
      type: '',
      currRoleId: '',
      modifyId: '',
      // isReload: true,
      spinloading: true,
      tabsloading: false,
      tableLoading: false,
      treeloading: false,
      searchKey: {
        roleName: '',
      },
      peopleSearchKey: {
        pageNo: 1,
        pageSize: 10,
      },
      pid: '',
      itemId: '',
      buttonVisible: false,
      checkedIdArr: {},
      btnRights: {
        add: true,
        edit: true,
        deleteRole: true,
        deletePolice: true,
      }, // Array of button permissions
      treeData: [],
      roleType: '',
      roleListResult: { list: [], loading: false },
      roleDetailManagResult: { list: [], loading: false },
      roleModuleListInRoleResult: { list: [], loading: false },
      // rloeResResult: { list: [], loading: false },
      rolePeopleResult: { list: [], loading: false },
    };
    this.resultCkecked = '';
  }

  // Component is about to load
  componentWillMount() {
    // This.get btn rights()
  }

  // The component has been loaded into the dom
  componentDidMount() {
    this.getData('init');
  }

  // #region Shrink business code function

  // Send Get the button permissions of the current menu
// getBtnRights() {
//   const { fetchBtns } = require('@configs/common')
//   fetchBtns(this, btnRights => this.setState({ btnRights }))
// }

  changeTab = (e) => {
    if (e.target.value === 'stepTree') {
      this.getTreeList();
    } else if (e.target.value === 'setmodules') {
      this.getRoleList();
    } else if (e.target.value === 'setpeoples') {
      this.getPeopleList();
    }
    this.setState({ activeTab: e.target.value });
  };

  // Get user list
  getData(state) {
    this.setState(
      {
        spinloading: true,
      },
      () => {
        fetchRoleList({ ...this.state.searchKey }, (result) => {
          this.setState(
            {
              spinloading: false,
              roleListResult: result.data,
            },
            () => {
              if (state === 'init') {
                if (this.state.roleListResult.list.length >= 1) {
                  const roleId = this.state.roleListResult.list[0].id || -1;
                  this.state.currRoleId = roleId;
                  const { type } = result.data.list[0];
                  this.state.roleType = type;
                  if (this.state.activeTab === 'stepTree') {
                    this.getTreeList();
                  } else if (this.state.activeTab === 'setmodules') {
                    this.getRoleList();
                  } else if (this.state.activeTab === 'setpeoples') {
                    this.getPeopleList();
                  }
                }
              }
            },
          );
        });
      },
    );
  }

  // Get details of current user
  getRoleDetail() {
    this.setState({ tabsloading: true }, () => {
      fetchRoleDetail(
        { id: this.state.currRoleId },
        (res) => {
          this.resultCkecked = res.data.resourceIds || [];
          this.setState({
            tabsloading: false,
            roleDetailManagResult: res.data,
          });
        },
        (res) => {
          message.warning(res.msg);
          this.setState({ tabsloading: false });
        },
      );
    });
  }

  // Get character tree
  getTreeList() {
    this.setState({ treeloading: true }, () => {
      fetchTreeList(
        { id: this.state.currRoleId },
        (res) => {
          this.state.checkedIdArr = {};
          res.data &&
            res.data.list.map((data) => {
              this.hangdleButton(data);
            });
          this.setState({ treeloading: false, treeData: res.data.list });
        },
        (res) => {
          message.warning(res.msg);
          this.setState({ treeloading: false, treeData: [] });
        },
      );
    });
  }

  // Get module data
  getRoleList() {
    fetchModuleListInRole({ id: this.state.currRoleId }, (res) => {
      this.state.checkedIdArr = {};
      this.setState({ roleModuleListInRoleResult: res.data });
      const { list } = res.data;
      list.map((data) => {
        this.hangdleButton(data);
      });
      this.getRoleDetail();
    });
  }

  // Handle all button permission operations
  hangdleButton(data) {
    const checkedArr = [];
    const checkedIdAll = [];

    const buttonsList = data.buttons;
    if (buttonsList && buttonsList.length > 0) {
      buttonsList.map((item) => {
        checkedArr.push(item.resName);
        checkedIdAll.push(item.id);
      });
      data.checkedArr = checkedArr.join(',');
      this.state.checkedIdArr[data.id] = checkedIdAll;
    } else {
      data.checkedArr = '';
    }
    if (data.children && data.children.length > 0) {
      const { children } = data;
      children.map((child) => {
        this.hangdleButton(child);
      });
    }
  }

  // Get list
  getPeopleList() {
    this.setState({ tableLoading: true }, () => {
      fetchUserList(
        { ...this.state.peopleSearchKey, roleId: this.state.currRoleId },
        (res) => {
          this.setState({ tableLoading: false, rolePeopleResult: res.data });
        },
      );
    });
  }

  // Actions performed after clicking the role name
  handleCurrentIndex = (id, type) => {
    this.setState(
      {
        currRoleId: id,
        roleType: type,
        peopleSearchKey: {
          ...this.state.peopleSearchKey,
          pageNo: 1,
        },
      },
      () => {
        if (this.state.activeTab === 'stepTree') {
          this.getTreeList();
        } else if (this.state.activeTab === 'setmodules') {
          this.getRoleList();
        } else if (this.state.activeTab === 'setpeoples') {
          this.getPeopleList();
        }
      },
    );
  };

  // Modify the enabled checkbox value
  handleCheckModify = (values) => {
    this.resultCkecked = values;
  };

  // Modify and save
  editSave = () => {
    fetchUpdateRoleRes(
      { id: this.state.currRoleId, resourceIds: this.resultCkecked },
      (res) => {
        if (res.status === 1) {
          message.success(res.msg);
          menu({}, (response) => {
            sessionStorage.setItem('menu', JSON.stringify(response.data.list));
            // hashHistory.push('/set$/roleManage')
// location.reload()
          });
        }
      },
    );
  };

  // Role addition
  roleAdd = () => {
    this.setState({ Visible: true, title: 'Add new role', type: 'add' });
  };

  // Actions performed when the role is modified
  onRoleModify = (id) => {
    fetchRoleDetail({ id: id }, (result) => {
      this.setState({
        Visible: true,
        title: 'Modify role',
        type: 'modify',
        modifyId: id,
        roleDetailManagResult: result.data,
      });
    });
  };

  // role deletion event
  handleRoleDelete = (id) => {
    fetchRoleDelete({ id: id }, (result) => {
      message.success(result.msg);
      this.getData('init');
    });
  };

  // Role search
  handleRoleSearch(value) {
    this.setState(
      {
        searchKey: {
          roleName: value,
        },
      },
      () => {
        this.getData();
      },
    );
  }

  // delete person
  handleDelete = (id) => {
    fetchRoleDeletePeople({ id: id, roleId: this.state.currRoleId }, (result) => {
      message.success(result.msg);
      this.getPeopleList(this.state.currRoleId);
    });
  };

  // search
  handleSearch = (e) => {
    e.stopPropagation();
    const keyword = this.props.form.getFieldValue('key');
    this.setState(
      {
        peopleSearchKey: {
          ...this.state.peopleSearchKey,
          keyword: keyword,
        },
      },
      () => {
        this.getPeopleList(this.state.currRoleId);
      },
    );
  };

  // Called after the form is saved
  handleOk = () => {
    this.setState({ Visible: false });
    fetchRoleList({}, (result) => {
      this.setState(
        {
          spinloading: false,
          roleListResult: result.data,
        },
        () => {
          if (this.state.roleListResult.list.length >= 1) {
            const roleId = this.state.roleListResult.list[0].id || -1;
            this.state.currRoleId = roleId;
            const { type } = result.data.list[0];
            this.state.roleType = type;
            if (this.state.activeTab === 'stepTree') {
              this.getTreeList();
            } else if (this.state.activeTab === 'setmodules') {
              this.getRoleList();
            } else if (this.state.activeTab === 'setpeoples') {
              this.getPeopleList();
            }
          }
        },
      );
    });
  };

  // ModalCancel
  handleCancel = () => {
    this.setState({ Visible: false });
  };

  // Page count changed
  pageChange = (newPage) => {
    this.setState(
      {
        peopleSearchKey: {
          ...this.state.peopleSearchKey,
          pageNo: newPage,
        },
      },
      () => {
        this.getPeopleList(this.state.currRoleId);
      },
    );
  };

  // Page size change event
  pageSizeChange = (e, pageSize) => {
    this.setState(
      {
        peopleSearchKey: {
          ...this.state.peopleSearchKey,
          pageNo: 1,
          pageSize: pageSize,
        },
      },
      () => {
        this.getPeopleList(this.state.currRoleId);
      },
    );
  };

  // Show button permission list
  buttonList = (id, parentid) => {
    this.setState({
      buttonVisible: true,
      pid: parentid,
      itemId: id,
      title: 'Module button permission list',
    });
  };

  cancelButton = () => {
    this.setState({
      buttonVisible: false,
    });
  };

  saveChecked = (selectedRowKeys) => {
    fetchUpdateButton(
      {
        id: this.state.currRoleId,
        resourceIds: selectedRowKeys,
        menuId: this.state.itemId,
      },
      (res) => {
        message.success(res.msg);
        this.getRoleList();
        this.cancelButton();
      },
    );
  };

  // Configuration of table display items
  renderColumn() {
    const { btnRights } = this.state;
    const configArr = [
      {
        title: 'Name',
        dataIndex: 'chineseName',
        key: 'chineseName',
        width: 200,
      },
      {
        title: 'unit',
        dataIndex: 'deptName',
        key: 'deptName',
        width: 200,
      },
      {
        title: 'Position',
        dataIndex: 'post',
        key: 'post',
        width: 200,
      },
      {
        title: 'account',
        dataIndex: 'username',
        key: 'username',
        width: 150,
      },
      {
        title: 'operate',
        key: 'operate',
        width: 100,
        render: (text, record, index) =>
          (btnRights.deletePolice ? (
            <span className="blue">
              <Popconfirm
                title="delete?"
                placement="left"
                onConfirm={() => this.handleDelete(record.id)}
              >
                <a>delete</a>
              </Popconfirm>
            </span>
          ) : null),
      },
    ];
    if (sessionStorage.getItem('roleName') !== '0') {
      // configArr.splice(4, 1)
    }
    return configArr;
  }

  // Return tab content
  returnContent(key) {
    if (key === 'setmodules') {
      const { roleModuleListInRoleResult } = this.state;
      return (
        <Spin spinning={this.state.tabsloading}>
          <RolesModule
            dataSource={roleModuleListInRoleResult.list}
            loading={roleModuleListInRoleResult.loading}
            checkedId={this.resultCkecked}
            onCheckModify={this.handleCheckModify}
            roleType={this.state.roleType}
            buttonList={this.buttonList}
          />
        </Spin>
      );
    } else if (key === 'setpeoples') {
      const { rolePeopleResult } = this.state;
      return (
        <div className="has-pagination table-flex flexcolumn">
          <Spin spinning={this.state.tableLoading}>
            <TableList
              rowKey="id"
              columns={this.renderColumn()}
              dataSource={rolePeopleResult.list}
              loading={rolePeopleResult.loading}
              currentPage={this.state.peopleSearchKey.pageNo}
              pageSize={this.state.peopleSearchKey.pageSize}
              scroll={{ y: true }}
              onChange={this.pageChange}
              onShowSizeChange={this.pageSizeChange}
              totalCount={rolePeopleResult.totalCount || 0}
            />
          </Spin>
          <div className="page-footer" />
        </div>
      );
    }
    if (key === 'stepTree') {
      return (
        <Spin spinning={this.state.treeloading}>
          <PeopleTree dataSource={this.state.treeData} />
        </Spin>
      );
    }
    return null;
  }

  // #endregion

  render() {
    const { roleDetailManagResult, roleListResult, activeTab } = this.state;
    const { getFieldDecorator } = this.props.form;
    const { btnRights } = this.state;
    return (
      <div className="page page-scrollfix page-usermanage page-rolemanage">
        <Layout>
          <Layout className="page-body">
            <Sider
              width={240}
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <Spin spinning={this.state.spinloading}>
                <FormItem>
                  <Search
                    style={{ width: '100%' }}
                    placeholder="Search roles"
                    onSearch={value => this.handleRoleSearch(value)}
                    addonAfter={
                      btnRights.add ? (
                        <Icon type="plus" title="Add new role" onClick={this.roleAdd} />
                      ) : null
                    }
                  />
                </FormItem>
                <div className="treeside">
                  <RolesList
                    roles={roleListResult.list || []}
                    handleRoleDelete={this.handleRoleDelete}
                    onRoleModify={this.onRoleModify}
                    onCurrentIndex={this.handleCurrentIndex}
                    btnRights={btnRights}
                    // Curr role id={this.state.curr role id}
                  />
                </div>
              </Spin>
            </Sider>
            <Content>
              <div className="page-header">
                <div className="layout-between">
                  <div className="left">
                    <Button
                      type="primary"
                      className={
                        activeTab === 'setpeoples' ||
                        activeTab === 'stepTree' ? (
                            'hide'
                          ) : null
                      }
                      onClick={this.editSave}
                    >
                      keep
                    </Button>
                    <div
                      className={
                        activeTab === 'setpeoples' ? 'page-search' : 'hide'
                      }
                    >
                      <Form className="flexrow">
                        <FormItem>
                          {getFieldDecorator('key')(<Input
                            className="input-base-width"
                            size="default"
                            placeholder="Please enter keywords to search"
                          />)}
                        </FormItem>
                        <Button type="primary" onClick={this.handleSearch}>
                          search
                        </Button>
                      </Form>
                    </div>
                  </div>
                  <div className="right">
                    <RadioGroup
                      onChange={this.changeTab}
                      defaultValue="stepTree"
                    >
                      <RadioButton value="stepTree">character tree</RadioButton>
                      <RadioButton value="setmodules">Module selection</RadioButton>
                      <RadioButton value="setpeoples">list</RadioButton>
                      {/* sessionStorage.getItem('roleName') === '0' ? <RadioButton value="setmodules">Module selection</RadioButton> : null*/}
                      {/* sessionStorage.getItem('roleName') === '0' ? <RadioButton value="setpeoples">list</RadioButton> : null*/}
                    </RadioGroup>
                  </div>
                </div>
              </div>
              <div className="page-content table-flex table-scrollfix">
                {this.returnContent(this.state.activeTab)}
              </div>
            </Content>
          </Layout>
        </Layout>
        {this.state.Visible ? (
          <RoleEditModal
            visible={this.state.Visible}
            title={this.state.title}
            onCancel={this.handleCancel}
            handleOk={this.handleOk}
            value={
              this.state.type === 'modify' ? (
                roleDetailManagResult
              ) : (
                { name: '', sort: '' }
              )
            }
            type={this.state.type}
            modifyId={this.state.modifyId}
          />
        ) : null}
        {this.state.buttonVisible ? (
          <ButtonModal
            title="Button permission list"
            visible={this.state.buttonVisible}
            pid={this.state.pid}
            itemId={this.state.itemId}
            cancelButton={this.cancelButton}
            saveChecked={this.saveChecked}
            checkedIdArr={this.state.checkedIdArr}
          />
        ) : null}
      </div>
    );
  }
}
