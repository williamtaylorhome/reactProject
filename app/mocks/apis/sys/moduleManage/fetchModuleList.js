
module.exports = {
  data: {
    list: [
      {
        id: 10060,
        resName: 'workbench',
        children: [
          {
            id: 10063,
            resName: 'Overview',
            resKey: 'desk$/index',
            resIcon: 'cleanAccess',
          },
        ],
        resKey: 'desk$',
        resIcon: 'home',
      },
      {
        id: 10062,
        resName: 'Settings center',
        children: [
          {
            id: 10108,
            resName: 'User Management',
            resKey: 'set$/userManage',
            resIcon: 'userManage',
          },
          {
            id: 10109,
            resName: 'role management',
            resKey: 'set$/roleManage',
            resIcon: 'roleManage',
          },
          {
            id: 10110,
            resName: 'authority management',
            resKey: 'set$/moduleManage',
            resIcon: 'unitCount',
          },
        ],
        resKey: 'set$',
        resIcon: 'set',
      },
    ],
  },
  msg: 'Successful operation',
  status: 1,
}
