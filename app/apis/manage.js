
import { createApi } from '@ajax'
import { mockURL, /* Base url,*/ path } from '@config'

const prefix = 'usercenter'
const option = { baseURL: mockURL }

// Module management
export const fetchModuleList = createApi(`${path}/${prefix}/resource/list`, option) // Get module list
export const fetchModuleDelete = createApi(`${path}/${prefix}/resource/delete`, option) // Delete module
export const fetchModuleDetail = createApi(`${path}/${prefix}/resource/detail`, option) // Get module details
export const fetchChangeModuleStatus = createApi(`${path}/${prefix}/resource/updateStatus`, option) // Modify module visibility status
export const fetchModuleUpdateDetail = createApi(`${path}/${prefix}/resource/update`, option) // Modify module details
export const fetchModuleAdd = createApi(`${path}/${prefix}/resource/save`, option) // New module
export const fetchButtonList = createApi(`${path}/${prefix}/resource/button/list`, option) // Button permission list
// role management
export const fetchRoleList = createApi(`${path}/${prefix}/role/list`, option) // role list
export const fetchRoleAdd = createApi(`${path}/${prefix}/role/save`, option) // save character
export const fetchRoleUpdate = createApi(`${path}/${prefix}/role/update`, option) // Role editor
export const fetchRoleDetail = createApi(`${path}/${prefix}/role/detail`, option) // Selected menus and buttons
export const fetchRoleDelete = createApi(`${path}/${prefix}/role/delete`, option) // Delete role
export const fetchModuleListInRole = createApi(`${path}/${prefix}/role/resList`, option) // Selected module
export const fetchUpdateRoleRes = createApi(`${path}/${prefix}/role/updateRes`, option) // Update selected modules

export const fetchRoleDeletePeople = createApi(`${path}/${prefix}/user/removeRole`, option)
export const fetchUpdateButton = createApi(`${path}/${prefix}/role/updateButton`, option)
export const fetchTreeList = createApi(`${path}/${prefix}/role/resTree`, option)
// User Management
export const fetchUserDepttList = createApi(`${path}/${prefix}/dept/list`, option) // Get the category list on the left side of user management
export const fetchUserList = createApi(`${path}/${prefix}/user/list`, option) // Get user list
export const fetchUserDetail = createApi(`${path}/${prefix}/user/detail`, option) // Get user details
export const fetchUserDetailUpdate = createApi(`${path}/${prefix}/user/update`, option) // Modify user details
export const fetchUserAdd = createApi(`${path}/${prefix}/user/save`, option) // New users
export const synUser = createApi(`${path}/${prefix}/user/synUser`, option) // Sync users
export const fetchUserSetRole = createApi(`${path}/${prefix}/user/updateRole`, option) // Modify user role
export const fetchUserDelete = createApi(`${path}/${prefix}/user/delete`, option) // delete users
export const fetchChangeUserStatus = createApi(`${path}/${prefix}/user/updateStatus`, option) // Set whether the user is frozen
