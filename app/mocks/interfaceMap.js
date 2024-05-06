
const path = '/mock'

// #region
const base = require('./apis/base') // basic interface
const userManage = require('./apis/sys/userManage') // User Management
const roleManage = require('./apis/sys/roleManage') // role management
const moduleManage = require('./apis/sys/moduleManage') // Module management
// #endregion

module.exports = {
  // #region Collapse all

  // #region Public
  [`${path}/usercenter/login`]: base.login, // Log in
  [`${path}/usercenter/user/userMenu`]: base.menu, // menu
  [`${path}/usercenter/user/userInfo`]: base.staff, // User Info
  [`${path}/usercenter/logout`]: base.logout, // quit
// #endregion

  // #region User Management
  [`${path}/usercenter/role/list`]: userManage.fetchRoleList, // role list
  [`${path}/usercenter/dept/list`]: userManage.fetchUserDepttList, // Department list
  [`${path}/usercenter/user/list`]: userManage.fetchUserList, // user list
  [`${path}/usercenter/user/detail`]: userManage.fetchUserDetail, // Get user details
  [`${path}/usercenter/user/update`]: userManage.fetchUserDetailUpdate, // Modify user details
  [`${path}/usercenter/user/save`]: userManage.fetchUserAdd, // New users
  [`${path}/usercenter/user/synUser`]: userManage.synUser, // New users
  [`${path}/usercenter/user/updateRole`]: userManage.fetchUserSetRole, // Modify user role
  [`${path}/usercenter/user/delete`]: userManage.fetchUserDelete, // delete users
  [`${path}/usercenter/user/updateStatus`]: userManage.fetchChangeUserStatus, // Set whether the user is frozen
// #endregion

  // #region role management
  [`${path}/usercenter/role/save`]: roleManage.fetchRoleAdd, // save character
  [`${path}/usercenter/role/delete`]: roleManage.fetchRoleDelete, // Delete role
  [`${path}/usercenter/role/update`]: roleManage.fetchRoleUpdate, // Role editor
  [`${path}/usercenter/role/resTree`]: roleManage.fetchTreeList, // role list
  [`${path}/usercenter/role/resList`]: roleManage.fetchModuleListInRole, // Selected module
  [`${path}/usercenter/role/detail`]: roleManage.fetchRoleDetail, // Selected menus and buttons
  [`${path}/usercenter/resource/button/list`]: roleManage.fetchButtonList, // Module's button list
  [`${path}/usercenter/user/removeRole`]: roleManage.fetchRoleDeletePeople, // delete users
  [`${path}/usercenter/role/updateButton`]: roleManage.fetchUpdateButton, // update button
  [`${path}/usercenter/role/updateRes`]: roleManage.fetchUpdateRoleRes, // Update selected modules
// #endregion

  // #region module management
  [`${path}/usercenter/resource/list`]: moduleManage.fetchModuleList, // Get module list
  [`${path}/usercenter/resource/delete`]: moduleManage.fetchModuleDelete, // Delete module
  [`${path}/usercenter/resource/detail`]: moduleManage.fetchModuleDetail, // Get module details
  [`${path}/usercenter/resource/updateStatus`]: moduleManage.fetchChangeModuleStatus, // Modify module visibility status
  [`${path}/usercenter/resource/update`]: moduleManage.fetchModuleUpdateDetail, // Modify module details
  [`${path}/usercenter/resource/save`]: moduleManage.fetchModuleAdd, // New module
// #endregion

  // #endregion
}
