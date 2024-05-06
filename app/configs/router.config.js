import React from 'react'
import { Router, Route, IndexRoute, hashHistory/* , Redirect*/ } from 'react-router'
import { isLogin } from '@configs/common'
import { set } from '@config'

import * as base from '@pages/base' // Base
import * as sysSet from '@pages/set' // Settings Center System Settings
import * as menu from '@pages/menu' // menu

export default () => (
  <Router history={hashHistory}>
    <Route path="/" component={base.app} onEnter={isLogin}>
      <IndexRoute component={base.example} />
      <Route path="/desk$/index" component={base.example} />
      {/* <Route path="/socketReceive" component={base.socketReceive} />*/}
      {/** *Menu Start*/}
      <Route path="/echarts" component={menu.echarts} />
      <Route path="/editor" component={menu.editor} />
      {/** *Menu end*/}
      {/** *System Settings Start*/}
      <Route path={`/${set}/userManage`} component={sysSet.userManage} />
      <Route path={`/${set}/roleManage`} component={sysSet.roleManage} />
      <Route path={`/${set}/moduleManage`} component={sysSet.moduleManage} />
      {/** *System settings end*/}
    </Route>
    <Route path="/login" component={base.login} />
    <Route path="*" component={base.notfound} />
  </Router>
)
