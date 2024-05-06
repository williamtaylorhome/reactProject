
module.exports = {
  data: {
    list: [

      {
        id: 10063,
        resName: 'Overview',
        resKey: 'desk$/index',
        resIcon: 'pgmb',
      },
      // {
      //   id: 10064,
      //   resName: 'sockettake over',
      //   resKey: 'socketReceive',
      //   resIcon: 'pgmb',
      // },
      {
        id: 600110233,
        resName: 'chart',
        resKey: 'echarts',
        resIcon: 'statistics',
      },
      {
        id: 100631,
        resName: 'editor',
        resKey: 'editor',
        resIcon: 'duty',
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
            resIcon: 'moduleManage',
          },
        ],
        resKey: 'set$',
        resIcon: 'xtxg',
      },
    ],
  },
  msg: 'Successful operation',
  status: 1,
}
