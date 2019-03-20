/**
 * @菜单栏配置
 */
const AdminMenu = [
  // 一级菜单栏
  {
    text: '仪表盘',
    icon: 'ios-color-palette-outline',
    isSubmenu: false, // 是否有子菜单
    name: '1',
    _to: '/erek-manage/erek-home' // 跳转的链接
  },
  {
    text: '查询管理',
    icon: 'ios-search-outline',
    isSubmenu: true,
    name: '8',
    list: [
      {
        text: '简单查询',
        hasSubmenu: false, // 是否有子菜单
        name: '8-1',
        _to: '/erek-manage/erek-search/simple' // 跳转的链接
      },
      {
        text: '订单号查询',
        hasSubmenu: false, // 是否有子菜单
        name: '8-2',
        _to: '/erek-manage/erek-search/ticket-code' // 跳转的链接
      }
    ]
  },
  {
    text: '订单管理',
    icon: 'ios-color-filter-outline',
    isSubmenu: true,
    name: '2',
    list: [
      {
        text: '飞机票订单',
        hasSubmenu: false, // 是否有子菜单
        name: '2-1',
        _to: '/erek-manage/erek-list-table' // 跳转的链接
      },
      {
        text: '火车票订单',
        hasSubmenu: false, // 是否有子菜单
        name: '2-2',
        _to: '/erek-manage/erek-list-standard' // 跳转的链接
      },
      {
        text: '大巴票订单',
        hasSubmenu: false, // 是否有子菜单
        name: '2-3',
        _to: '/erek-manage/erek-list-standard' // 跳转的链接
      },
      {
        text: '电影票订单',
        hasSubmenu: false, // 是否有子菜单
        name: '2-4',
        _to: '/erek-manage/erek-list-standard' // 跳转的链接
      }
    ]
  },
  {
    text: '飞机管理',
    icon: 'ios-plane-outline',
    isSubmenu: true,
    name: '3',
    list: [
      {
        text: '新增机场站点',
        hasSubmenu: false, // 是否有子菜单
        name: '3-1',
        _to: '/erek-manage/erek-plane/add-plane-position' // 跳转的链接
      },
      {
        text: '新增航班信息',
        hasSubmenu: false, // 是否有子菜单
        name: '3-2',
        _to: '/erek-manage/erek-plane/add-plane-time' // 跳转的链接
      },
      {
        text: '飞机列表',
        hasSubmenu: false, // 是否有子菜单
        name: '3-3',
        _to: '/erek-manage/erek-plane/plane-list' // 跳转的链接
      }
    ]
  },
  {
    text: '火车管理',
    icon: 'ios-train-outline',
    isSubmenu: true,
    name: '4',
    list: [
      {
        text: '新增火车站点',
        hasSubmenu: false, // 是否有子菜单
        name: '4-1',
        _to: '/erek-manage/erek-train/add-train-position' // 跳转的链接
      },
      {
        text: '新增火车班次',
        hasSubmenu: false, // 是否有子菜单
        name: '4-2',
        _to: '/erek-manage/erek-train/add-train-time' // 跳转的链接
      },
      {
        text: '火车列表',
        hasSubmenu: false, // 是否有子菜单
        name: '4-3',
        _to: '/erek-manage/erek-train/train-list' // 跳转的链接
      }
    ]
  },
  {
    text: '汽车管理',
    icon: 'ios-bus-outline',
    isSubmenu: true,
    name: '5',
    list: [
      {
        text: '新增汽车站点',
        hasSubmenu: false, // 是否有子菜单
        name: '5-1',
        _to: '/erek-manage/erek-bus/add-bus-position' // 跳转的链接
      },
      {
        text: '新增汽车班次',
        hasSubmenu: false, // 是否有子菜单
        name: '5-2',
        _to: '/erek-manage/erek-bus/add-bus-time' // 跳转的链接
      },
      {
        text: '汽车列表',
        hasSubmenu: false, // 是否有子菜单
        name: '5-3',
        _to: '/erek-manage/erek-bus/bus-list' // 跳转的链接
      }
    ]
  },
  // 三级菜单栏
  {
    text: '电影管理',
    icon: 'ios-recording-outline',
    isSubmenu: true,
    name: '6',
    list: [
      {
        text: '影院管理',
        hasSubmenu: true,
        name: '6-1',
        submenu: [
          {
            text: '新增影院',
            name: '6-1-1',
            _to: '/erek-manage/erek-safe-admin-role'
          },
          {
            text: '所有影院',
            name: '6-1-2',
            _to: '/erek-manage/erek-safe-admin-password'
          }
        ]
      },
      {
        text: '电影管理',
        hasSubmenu: true,
        name: '6-2',
        submenu: [
          {
            text: '上映电影',
            name: '6-2-1',
            _to: '/erek-manage/erek-safe-admin-role'
          },
          {
            text: '所有电影',
            name: '6-2-2',
            _to: '/erek-manage/erek-safe-admin-password'
          }
        ]
      }
    ]
  },
  {
    text: '城市管理',
    icon: 'ios-color-filter-outline',
    isSubmenu: true,
    name: '7',
    list: [
      {
        text: '新增城市',
        hasSubmenu: false, // 是否有子菜单
        name: '7-1',
        _to: '/erek-manage/erek-city/add-city' // 跳转的链接
      },
      {
        text: '城市清单',
        hasSubmenu: false, // 是否有子菜单
        name: '7-2',
        _to: '/erek-manage/erek-city/city-list' // 跳转的链接
      }
    ]
  },

  {
    text: '部门管理',
    icon: 'ios-people-outline',
    isSubmenu: false, // 是否有子菜单
    name: '9',
    _to: '/erek-manage/erek-department/list' // 跳转的链接
  },
  {
    text: '个人中心',
    icon: 'ios-person-outline',
    isSubmenu: true,
    name: '10',
    list: [
      {
        text: '个人信息',
        hasSubmenu: false, // 是否有子菜单
        name: '10-1',
        _to: '/erek-manage/erek-user/user-info' // 跳转的链接
      },
      {
        text: '个人设置',
        hasSubmenu: false, // 是否有子菜单
        name: '10-2',
        _to: '/erek-manage/erek-user/setting' // 跳转的链接
      }
    ]
  }
]

export default AdminMenu
