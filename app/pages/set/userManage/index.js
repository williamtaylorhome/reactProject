import React, { Component } from 'react';
import {
  Spin,
  notification,
  Button,
  Popconfirm,
  Form,
  Input,
  message,
  Layout,
} from 'antd';
import TableList from '@tableList';
import { synUser } from '@apis/common';
import {
  fetchUserDepttList,
  fetchUserList,
  fetchUserDetail,
  fetchUserDelete,
  fetchRoleList,
  fetchChangeUserStatus,
} from '@apis/manage';
import TreeList from './treeList';
import AddPolice from './modal/addPolice';
import SelectRole from './modal/selectRole';

const FormItem = Form.Item;
const { Content, Sider } = Layout;
const { fetchBtns } = require('@configs/common');

@Form.create({})
// Declare components and output them externally
export default class app extends Component {
  // Initialize page constants and bind event methods
  constructor(props) {
    super(props);
    this.state = {
      // activeTab: 'list',
      searchtitle: '',
      PoliceAddVisible: false,
      synchronizeLoading: false,
      RoleVisible: false,
      spinloading: true,
      moduletitle: '',
      moduletype: '',
      currPeopleId: '',
      // hasList: false,
      searchKey: {
        keyword: '',
        pageSize: 10,
        pageNo: 1,
        deptCode: '',
      },
      btnRights: {
        view: true,
        freeze: true,
        delete: true,
        edit: true,
        add: true,
      }, // Array of button permissions
      userDeptResult: { list: [], loading: false },
      userListResult: { list: [], loading: false },
      userDetailResult: { list: [], loading: false },
      userRoleSetResult: { list: [], loading: false },
    };
  }

  // Component is about to load
  componentWillMount() {
    // This.get btn rights()
    fetchRoleList({}, (res) => {
      this.setState({ userRoleSetResult: res.data });
    });
    fetchUserDepttList({}, (res) => {
      if (res.data.list.length > 0) {
        this.setState(
          {
            userDeptResult: res.data,
            spinloading: false,
            searchKey: {
              ...this.state.searchKey,
              deptCode: res.data.list[0].deptCode,
            },
          },
          () => {
            this.getData(() => {
              this.setState({
                searchtitle: '杭州市',
                // hasList: true,
              });
            });
          },
        );
      } else {
        this.setState({ spinloading: false });
      }
    });
  }

  // The component has been loaded into the dom
  componentDidMount() {
    this.props.form.setFieldsValue({ key: '' });
  }

  // #region Shrink business code function

  // Send Get the button permissions of the current menu
// getBtnRights() {
//   fetchBtns(this, btnRights => this.setState({ btnRights }));
// }

  // Get user list data
  getData(callback) {
    fetchUserList({ ...this.state.searchKey }, (res) => {
      this.setState({
        userListResult: res.data,
      });
      callback && callback();
    });
  }

  // delete users
// handleDelete(id) {
//   if (sessionStorage.getItem("userid") === id) {
//     message.warning("You cannot delete yourself");
//     return;
//   }
//   const curUserListResult = this.state.userListResult;
//   let curpage = this.state.searchKey.pageNo;
//   fetchUserDelete(
//     { deptcode: this.state.searchKey.deptCode, id: id },
//     res => {
//       message.success(res.msg);
//       if (
//         curUserListResult.totalPage > 1 &&
//         curUserListResult.totalCount % 10 === 1
//       ) {
//         curpage -= 1;
//       }
//       this.setState(
//         {
//           searchKey: {
//             ...this.state.searchKey,
//             pageNo: curpage
//           }
//         },
//         () => {
//           this.getData();
//         }
//       );
//     }
//   );
// }

  // Freeze and unfreeze users
  handleChangeStatus(id, status) {
    fetchChangeUserStatus({ id: id, status: status }, (res) => {
      message.success(res.msg);
      this.getData();
    });
  }

  // Click on person details
  handleUserInfo = (id) => {
    fetchUserDetail({ id: id }, (res) => {
      this.setState({
        userDetailResult: res.data,
        PoliceAddVisible: true,
        moduletype: 'edit',
        moduletitle: 'Details',
        currPeopleId: id,
      });
    });
  };

  // Click on the person role
// handleUserRole(id) {
//   fetchUserDetail({ id: id }, res => {
//     this.setState({
//       userDetailResult: res.data,
//       RoleVisible: true,
//       currPeopleId:id
//     });
//   });
// }

  // search
  handleSearch = (e) => {
    e.preventDefault();
    const keyword = this.props.form.getFieldValue('key');
    this.setState(
      {
        spinloading: true,
        searchKey: {
          ...this.state.searchKey,
          keyword: keyword,
          pageNo: 1,
        },
      },
      () => {
        this.getData(() => {
          this.setState({ spinloading: false });
        });
      },
    );
  };

  // Get the current department deptid when clicking on a tree node
  onSelect = (info, title) => {
    if (info && info.length > 0) {
      this.setState(
        {
          spinloading: true,
          searchtitle: title,
          searchKey: {
            ...this.state.searchKey,
            deptCode: info[0],
            pageNo: 1,
            keyword: '',
          },
        },
        () => {
          this.getData(() => {
            this.setState({
              spinloading: false,
              // hasList: true,
            });
          });
        },
      );
      this.props.form.setFieldsValue({ key: '' });
    }
  };

  // When you click to add a person, check whether the department deptid exists, and if so, a pop-up window will pop up to add a new person.
  policeAdd() {
    if (this.state.searchKey.deptCode) {
      this.setState({
        PoliceAddVisible: true,
        moduletype: 'add',
        moduletitle: 'New',
      });
    } else {
      notification.error({
        message: 'mistake',
        description: 'Please select a department first',
      });
    }
  }

  synchronize() {
    message.info('User data is being synchronized');
    this.setState(
      {
        synchronizeLoading: true,
      },
      () => {
        synUser(
          {},
          () => {
            message.success('User data synchronization completed');
            this.setState({
              synchronizeLoading: false,
            });
            this.getData();
          },
          (res) => {
            message.warning(res.msg);
            this.setState({
              synchronizeLoading: false,
            });
          },
        );
      },
    );
  }

  // Add or edit user saves
  handleOk = () => {
    const curUserListResult = this.state.userListResult;
    let curpage = this.state.searchKey.pageNo;
    if (
      this.state.moduletype === 'add' &&
      curUserListResult &&
      curUserListResult.totalCount > 0 &&
      curUserListResult.totalCount % 10 === 0
    ) {
      curpage += 1;
    }
    this.setState(
      {
        PoliceAddVisible: false,
        searchKey: {
          ...this.state.searchKey,
          pageNo: curpage,
        },
      },
      () => {
        this.getData();
      },
    );
  };

  // Add user modal cancel
  handleCancel = () => {
    this.setState({ PoliceAddVisible: false });
  };

  // Role pop-up confirmation event
// handleOkRole() {
//   this.setState({ RoleVisible: false }, () => {
//     this.getData();
//   });
// }

  // Character pop-up window cancellation event
// handleCancelRole() {
//   this.setState({ RoleVisible: false });
// }

  // page change event
  pageChange = (newPage) => {
    this.state.searchKey.pageNo = newPage;
    this.getData();
  };

  // Page size change event
  pageSizeChange = (e, pageSize) => {
    this.state.searchKey.pageNo = 1;
    this.state.searchKey.pageSize = pageSize;
    this.getData();
  };

  // Generate table header information
  renderColumn() {
    return [
      {
        title: 'Name',
        dataIndex: 'chineseName',
        key: 'chineseName',
        width: '15%',
      },
      {
        title: 'Position',
        dataIndex: 'post',
        key: 'post',
        width: '15%',
      },
      {
        title: 'account number',
        dataIndex: 'username',
        key: 'username',
        width: '15%',
      },
      {
        title: 'Account status',
        dataIndex: 'statusLabel',
        key: 'statusLabel',
        width: '15%',
        render: (text, record, index) => (
          <span>{record.status ? 'frozen': 'normal'}</span>
        ),
      },
      {
        title: 'Role',
        dataIndex: 'roles',
        key: 'roles',
        width: '20%',
        render: (text, record, index) => {
          const roleNames = [];
          (text || []).map((item) => {
            roleNames.push(item.roleName);
          });
          return roleNames.length === 0 ? '' : roleNames.join(',');
        },
      },
      {
        title: 'operate',
        key: 'operate',
        render: (text, record, index) => {
          const { btnRights } = this.state;
          return (
            <span>
              {btnRights.view ? (
                <span>
                  <a onClick={() => this.handleUserInfo(record.id)}>Details</a>
                  <span className="ant-divider" />
                </span>
              ) : null}
              {btnRights.freeze ? (
                <span>
                  <Popconfirm
                    title={`confirm${record.status ? 'thaw' : 'freeze'}Account?`}
                    placement="left"
                    onConfirm={() => this.handleChangeStatus(record.id, `${record.status}`)}
                  >
                    <a>{record.status ? 'Unfreeze freeze the accountunt' : '冻结账户'}</a>
                  </Popconfirm>
                </span>
              ) : null}
              {/*
                <span className="ant-divider" />
                btnRights.delete ?
                  <Popconfirm title="delete?" placement="left" onConfirm={() => this.handleDelete(record.id)}>
                    <a>delete</a>
                  </Popconfirm> : null
              */}
            </span>
          );
        },
      },
    ];
  }

  // #endregion

  render() {
    const {
      userDeptResult,
      userListResult,
      userDetailResult,
      userRoleSetResult,
    } = this.state;
    const { btnRights } = this.state;
    const { getFieldDecorator } = this.props.form;
    const thevalue = this.state.moduletype === 'add' ? '' : userDetailResult;

    return (
      <div className="page page-scrollfix page-usermanage">
        <Layout>
          <Layout className="page-body">
            <Sider
              width={240}
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <Spin spinning={this.state.spinloading}>
                <h3 className="page-title">Hangzhou City</h3>
                <div className="treeside">
                  <TreeList
                    trees={userDeptResult.list}
                    curDeptCode={this.state.searchKey.deptCode}
                    onSelect={this.onSelect}
                  />
                </div>
              </Spin>
            </Sider>
            <Content>
              <h3 className="page-title">
                {this.state.searchtitle}
                <span className="error">
                  {' '}
                  {userListResult.totalCount ? userListResult.totalCount : 0}
                </span>人
              </h3>
              <div className="page-header">
                <div className="layout-between">
                  <Form className="flexrow" onSubmit={this.handleSearch}>
                    <FormItem>
                      {getFieldDecorator('key')(<Input
                        className="input-base-width"
                        size="default"
                        placeholder="Please enter keywords to search"
                      />)}
                    </FormItem>
                    <Button type="primary" htmlType="submit">
                      search
                    </Button>
                  </Form>
                </div>
              </div>
              <div className="page-content has-pagination table-flex table-scrollfix">
                <TableList
                  rowKey="id"
                  columns={this.renderColumn()}
                  dataSource={userListResult.list}
                  currentPage={this.state.searchKey.pageNo}
                  pageSize={this.state.searchKey.pageSize}
                  loading={userListResult.loading}
                  scroll={{ y: true }}
                  onChange={this.pageChange}
                  onShowSizeChange={this.pageSizeChange}
                  totalCount={userListResult.totalCount}
                />
              </div>
              <div className="page-footer">
                <div className="page-footer-buttons">
                  {btnRights.add ? (
                    <Button
                      type="primary"
                      style={{ marginRight: '10px' }}
                      onClick={() => this.policeAdd()}
                    >
                      {' '}
                      Add new personnel
                    </Button>
                  ) : null}
                  {btnRights.add ? (
                    <Button
                      type="primary"
                      loading={this.state.synchronizeLoading}
                      onClick={() => this.synchronize()}
                    >
                      {' '}
                      Sync people
                    </Button>
                  ) : null}
                </div>
              </div>
            </Content>
          </Layout>
        </Layout>

        {/* Allow new judgments*/}
        {this.state.PoliceAddVisible ? (
          <AddPolice
            visible={this.state.PoliceAddVisible}
            title={this.state.moduletitle}
            handleOk={this.handleOk}
            values={thevalue}
            deptId={this.state.searchKey.deptCode}
            currPeopleId={this.state.currPeopleId}
            type={this.state.moduletype}
            onCancel={this.handleCancel}
            roleList={userRoleSetResult.list || []}
          />
        ) : null}
        {/* {this.state.RoleVisible ? (
          <SelectRole
            visible={this.state.RoleVisible}
            handleOkRole={() => this.handleOkRole()}
            values={userDetailResult}
            currPeopleId={this.state.currPeopleId}
            select={userRoleSetResult.list}
            onCancel={() => this.handleCancelRole()}
          />
        ) : null}*/}
      </div>
    );
  }
}
