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
            resType: 1,
            status: 0,
            parentId: 10060,
          },
        ],
        resKey: 'desk$',
        resIcon: 'home',
        resType: 1,
        status: 0,
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
            parentId: 10062,
            children: [
              {
                id: 11003,
                resName: 'have a look',
                resKey: 'desk$/index',
                resIcon: 'cleanAccess',
                parentId: 10108,
                children: [
                  {
                    id: 11004,
                    resName: 'test',
                    resKey: 'desk$/index',
                    resIcon: 'cleanAccess',
                    parentId: 11003,
                  },
                ],
              },
            ],
          },
          {
            id: 10109,
            resName: 'role management',
            resKey: 'set$/roleManage',
            resIcon: 'roleManage',
            parentId: 10062,
          },
          {
            id: 10110,
            resName: 'authority management',
            resKey: 'set$/moduleManage',
            resIcon: 'unitCount',
            parentId: 10062,
          },
        ],
        resKey: 'set$',
        resIcon: 'set',
        resType: 1,
        status: 0,
      },
    ],
  },
  msg: '',
  errorCode: '',
  status: 1,
};
