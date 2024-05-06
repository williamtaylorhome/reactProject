
import { createApi } from '@ajax'
import { mockURL, /* Base url,*/ path } from '@config'

const prefix = 'usercenter'
const option = { baseURL: mockURL }

export const login = createApi(`${path}/${prefix}/login`, option) // Login
export const logout = createApi(`${path}/${prefix}/logout`, option) // Sign out
export const loginByTicket = createApi(`${path}/${prefix}/loginByTicket`, option) // Login via ticket
export const loginByKey = createApi(`${path}/service/pagerservice/checkKey`, option) // Enter the project through key
export const staff = createApi(`${path}/${prefix}/user/userInfo`, option) // User Info
export const synUser = createApi(`${path}/${prefix}/user/synUser`, option)// Sync users
export const menu = createApi(`${path}/${prefix}/user/userMenu`, option) // Get menu
export const getLevel = createApi(`${path}/${prefix}/user/getLevel`, option) // Current user's level
export const getBtns = createApi(`${path}/${prefix}/resource/listByPid`, option) // Get menu id
export const getAllRetrieval = createApi(`${path}/data/sys/retrieval/queryAllRetrievald`) // Get g form2.0 head search
