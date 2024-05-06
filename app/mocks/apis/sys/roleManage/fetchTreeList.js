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
            parentId: 10060,
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
            parentId: 10062,
            buttons: [
              {
                id: 432,
                resName: 'upload photos',
                resType: 3,
                parentId: 427,
                resKey: 'upload',
                status: 0,
              },
              {
                id: 433,
                resName: 'View photos',
                resType: 3,
                parentId: 427,
                resKey: 'view',
                status: 0,
              },
              {
                id: 434,
                resName: 'delete photo',
                resType: 3,
                parentId: 427,
                resKey: 'delete',
                status: 0,
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
      },
    ],
  },
  msg: '',
  errorCode: '',
  status: 1,
};
