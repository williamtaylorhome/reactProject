
import { createAction } from 'redux-actions'
import * as common from '@apis/common'
import { createAjaxAction } from '@configs/common'


// login
export const requestLogin = createAction('request login')
export const recevieLogin = createAction('receive login')
export const login = createAjaxAction(common.login, requestLogin, recevieLogin)

// gFormCache 2.0
export const setGformCache2 = createAction('set gform cache2')
export const clearGformCache2 = createAction('clear gform cache2')

// socket receive
// export const socketReceive = createAction('socketReceive')
