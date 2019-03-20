/**
 * @菜单栏配置
 */
const UserMenu = [
  // 一级菜单栏
  {
    text: '仪表盘',
    icon: 'ios-color-palette-outline',
    isSubmenu: false, // 是否有子菜单
    name: '1',
    _to: '/erek-manage/erek-home' // 跳转的链接
  },
  {
    text: '列表页',
    icon: 'md-grid',
    isSubmenu: true,
    name: '4',
    list: [
      {
        text: '表格',
        hasSubmenu: false, // 是否有子菜单
        name: '4-1',
        _to: '/erek-manage/erek-list-table' // 跳转的链接
      },
      {
        text: '列表',
        hasSubmenu: false, // 是否有子菜单
        name: '4-2',
        _to: '/erek-manage/erek-list-standard' // 跳转的链接
      },
      {
        text: '卡片',
        hasSubmenu: false, // 是否有子菜单
        name: '4-3',
        _to: '/erek-manage/erek-list-card' // 跳转的链接
      },
      {
        text: '头像',
        hasSubmenu: false, // 是否有子菜单
        name: '4-4',
        _to: '/erek-manage/erek-list-avatar' // 跳转的链接
      }
    ]
  },
  {
    text: '错误页',
    icon: 'md-warning',
    isSubmenu: true,
    name: '5',
    list: [
      {
        text: '403',
        hasSubmenu: false, // 是否有子菜单
        name: '5-1',
        _to: '/erek-manage/erek-exception/403' // 跳转的链接
      },
      {
        text: '404',
        hasSubmenu: false, // 是否有子菜单
        name: '5-2',
        _to: '/erek-manage/erek-exception/404' // 跳转的链接
      },
      {
        text: '500',
        hasSubmenu: false, // 是否有子菜单
        name: '5-3',
        _to: '/erek-manage/erek-exception/500' // 跳转的链接
      }
    ]
  }
]

export default UserMenu
