
import { hashHistory } from 'react-router'
import { message } from 'antd'
import { loginByTicket, staff, login as loginApi, getBtns } from '@apis/common'

export function parseQueryString(url) {
  const obj = {}
  if (url.indexOf('?') !== -1) {
    const str = url.split('?')[1]
    const strs = str.split('&')
    strs.map((item, i) => {
      const arr = strs[i].split('=')
      /* Eslint disable*/
      obj[arr[0]] = arr[1]
    })
  }
  return obj
}

/* ---------------Verify ticket and obtain user information and menu information ---------------*/
const _fetchLoginByTicket = async ticket => new Promise((resolve) => {
  loginByTicket({ ticket }, (response) => {
    resolve(response.data)
  }, (response) => {
    const obj = parseQueryString(window.location.href)
    console.log(obj)
    if (obj.ticket || obj.mode) {
      message.info('登录过期或服务不可用')
    } else {
      hashHistory.replace('/login')
    }
  })
})

const _fetchStaff = () => new Promise((resolve) => {
  staff({}, (res) => {
    const { data } = res
    sessionStorage.setItem('userinfo', JSON.stringify(data))
    resolve()
  })
})

/* eslint-disable no-use-before-define*/
export const isHasCurrentMenu = (allMenu, pathname) => compare(allMenu, pathname)
/* eslint-enable no-use-before-define*/


const _fetchNav = pathname => new Promise((resolve) => {
  // try {
//   if (JSON.parse(sessionStorage.getItem('menu')).length > 0) {
//     resolve()
//     return
//   }
// } catch (e) { e }
  nav({}, (response) => {
    const { list } = response.data
    if (list.length === 0) {
      message.info('该账户没有任何菜单权限，请联系管理员')
      hashHistory.replace('/login')
      // this.setState({ loading: false })
      return
    }
    sessionStorage.setItem('menu', JSON.stringify(list))
    // TODO: After adding menu permissions, you need to add the following code
// if (pathname !== '/' && !isHasCurrentMenu(list, pathname)) {
//   if (process.env.NODE_ENV === 'production') {
//     hashHistory.replace('/')
//   }
// }
    resolve()
  })
})

/* It will be called in the top-level component regardless of whether it contains the ticket parameter.*/
export const validateTickit = async function validateTickit({ query, pathname }, callback) {
  const { ticket } = query
  if (ticket) {
    const loginInfo = await _fetchLoginByTicket(ticket)
    sessionStorage.setItem('token', loginInfo.token)
    // sessionStorage.setItem('isLeftNavMini', false)
  } else {
    /**
     * Only exists in the following two situations:
     * 1. If you are not logged in, exit to the login page to log in. When logging in, get the menu and save it in sessionStorage, then jump to the page. When executing this code, you only need to request staff information.
     * 2. After logging in, refresh the page and execute this code. It is considered that the menu has been obtained and saved in sessionStorage during the last login, so only staff information needs to be requested.
     *    (FIXME: When the network speed is slow, it may be possible to directly enter the URL to access the page after getting the login token and before the menu data is returned, so the menu cannot be obtained)
     */
// await_fetchStaff()
// if (typeof callback === 'function')callback()
    /*
    _fetchStaff()
    _fetchNav(callback)
    */
  }

  const _a = _fetchStaff()
  const _b = _fetchNav(pathname)
  await _a
  await _b
  if (typeof callback === 'function') callback()
}
/* ----------------------------------------------------------------------------*/
/* --------------Store the menu id of the current page in the menuId attribute of sessionStorage --------------*/
// comparison method
function compare(children, pathname) {
  for (let i = 0; i < children.length; i += 1) {
    const item = children[i]
    /* eslint-disable no-useless-escape*/
    const _resKey = `${item.resKey.replace(/[\$\.\?\+\^\[\]\(\)\{\}\|\\\/]/g, '\\$&').replace(/\*\*/g, '[\\w|\\W]+').replace(/\*/g, '[^\\/]+')}$`
    /* eslint-enable no-useless-escape*/
    if (new RegExp(_resKey).test(pathname)) {
      sessionStorage.setItem('menuId', item.id)
      return true
    } else if (item.children) {
      if (compare(item.children, pathname)) return true
    }
  }
  return false
}

// Get menu id
export const getMenuId = (navs, pathname) => {
  if (navs && navs.length > 0) {
    compare(navs, pathname)
  }
}
/* ----------------------------------------------------------------------------*/
/* ------------------------Login-------------------------*/
export const login = (params, success, failure) => {
  loginApi(params, (response) => {
    sessionStorage.setItem('token', response.data.token)
    localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage))
    // _fetchNav().then(() => { success() })
    if (typeof success === 'function') success(response)
  }, (response) => {
    if (typeof failure === 'function') failure(response)
  })
}
/* -------------------------------------------------------*/
// Get button
export const fetchBtns = (component, cb) => {
  getBtns({ id: sessionStorage.getItem('menuId') }, (res) => {
    const result = {}
    res.data.list.map((item) => {
      result[item.resKey] = true
    })
    typeof (cb) === 'function' ? cb(result) : ''
  })
}

// Determination of entry route
export const isLogin = (nextState, replaceState) => {
  if (nextState.location.query && nextState.location.query.ticket) { // If the url comes with a ticket
    sessionStorage.setItem('token', 'ticket')
  }
  if (nextState.location.query && nextState.location.query.key) { // If the url comes with a key
    sessionStorage.setItem('token', 'key')
  }
  const token = sessionStorage.getItem('token')
  if (!token) { // If there is no token, then return to the homepage
    replaceState('/login')
  }
}


// Asynchronous requests need to be done in redux way
export const createAjaxAction = (createdApi, startAction, endAction) => (request = {}, resolve, reject, config) => (dispatch) => {
  if (startAction) dispatch(startAction({ req: request, res: {} }))
  const _resolve = (response) => {
    if (endAction) dispatch(endAction({ req: request, res: response }))
    if (resolve) resolve(response)
  }
  return createdApi(request, _resolve, reject, config)
}
