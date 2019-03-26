import Vue from 'vue'
import Router from 'vue-router'
import ErekManageRouter from '@/view/Router'
// 后台首页
import HomeComponent from '@/view/Ticket/Home/Index'
// 登陆页
import LoginComponent from '@/view/Ticket/Login/Index'

// 仪表盘
import DashBoardComponent from '@/view/Ticket/Dashboard/Index'

// 列表页
import VueErekTableList from '@/view/Manage/VueErekList/Table'
import VueErekStandardList from '@/view/Manage/VueErekList/Standard'
import VueErekCardList from '@/view/Manage/VueErekList/Card'
import VueErekAvatarList from '@/view/Manage/VueErekList/Avatar'

// 工具栏
import VueErekToolMessage from '@/view/Manage/VueErekTool/Message'
import VueErekToolAdvertise from '@/view/Manage/VueErekTool/Advertise'
import VueErekToolCommonality from '@/view/Manage/VueErekTool/Commonality'
import VueErekToolWords from '@/view/Manage/VueErekTool/Words'

// 详情页
import VueErekBaseProfile from '@/view/Manage/VueErekProfile/BasicProfile'
import VueEreAdvanceProfile from '@/view/Manage/VueErekProfile/AdvanceProfile'

// 错误页
import VueErekException403 from '@/view/Manage/VueErekException/403'
import VueErekException404 from '@/view/Manage/VueErekException/404'
import VueErekException500 from '@/view/Manage/VueErekException/500'
// 飞机管理
import PlaneRouter from '@/view/Ticket/Plane/Router'
import PlanePosition from '@/view/Ticket/Plane/Position'
import PlaneTime from '@/view/Ticket/Plane/Time'
import PlaneListComponents from '@/view/Ticket/Plane/List'

// 火车管理
import TrainRouter from '@/view/Ticket/Train/Router'
import TrainPosition from '@/view/Ticket/Train/Position'
import TrainTime from '@/view/Ticket/Train/Time'
import TrainListComponents from '@/view/Ticket/Train/List'

// 汽车管理
import BusRouter from '@/view/Ticket/Bus/Router'
import BusPosition from '@/view/Ticket/Bus/Position'
import BusTime from '@/view/Ticket/Bus/Time'
import BusListComponents from '@/view/Ticket/Bus/List'

// 城市管理
import CityRouter from '@/view/Ticket/City/Router'
import CityComponents from '@/view/Ticket/City/Index'
import CityListComponents from '@/view/Ticket/City/List'

// 查询管理
import SearchRouter from '@/view/Ticket/Search/Router'
import SimpleSearch from '@/view/Ticket/Search/Index'
import TicketCodeSearch from '@/view/Ticket/Search/TicketCode'

// 部门管理
import DepartmentComponents from '@/view/Ticket/Department/Index'

// 员工管理
import StaffComponents from '@/view/Ticket/Staff/Index'

// 个人页
import UserComponents from '@/view/Ticket/User/Index'
import VueErekUserSetting from '@/view/Manage/VueErekUser/Setting'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'HomeComponent',
      component: HomeComponent,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/login',
      name: 'LoginComponent',
      component: LoginComponent,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/erek-manage',
      name: 'ErekManageRouter',
      component: ErekManageRouter,
      redirect: '/erek-manage/erek-home',
      children: [
        {
          path: 'erek-home',
          name: 'DashBoardComponent',
          component: DashBoardComponent,
          meta: {
            keepAlive: false
          }
        },
        // 工具栏
        {
          path: 'erek-tool-message',
          name: 'VueErekToolMessage',
          component: VueErekToolMessage,
          meta: {
            keepAlive: false
          }
        },
        {
          path: 'erek-tool-advertise',
          name: 'VueErekToolAdvertise',
          component: VueErekToolAdvertise,
          meta: {
            keepAlive: false
          }
        },
        {
          path: 'erek-tool-commonality',
          name: 'VueErekToolCommonality',
          component: VueErekToolCommonality,
          meta: {
            keepAlive: false
          }
        },
        {
          path: 'erek-tool-words',
          name: 'VueErekToolWords',
          component: VueErekToolWords,
          meta: {
            keepAlive: false
          }
        },
        // 详情页
        {
          path: 'erek-profile-basic',
          name: 'VueErekBaseProfile',
          component: VueErekBaseProfile,
          meta: {
            keepAlive: false
          }
        },
        {
          path: 'erek-profile-advance',
          name: 'VueEreAdvanceProfile',
          component: VueEreAdvanceProfile,
          meta: {
            keepAlive: false
          }
        },
        // 列表页
        {
          path: 'erek-list-table',
          name: 'VueErekTableList',
          component: VueErekTableList,
          meta: {
            keepAlive: false
          }
        },
        {
          path: 'erek-list-standard',
          name: 'VueErekStandardList',
          component: VueErekStandardList,
          meta: {
            keepAlive: false
          }
        },
        {
          path: 'erek-list-card',
          name: 'VueErekCardList',
          component: VueErekCardList,
          meta: {
            keepAlive: false
          }
        },
        {
          path: 'erek-list-avatar',
          name: 'VueErekAvatarList',
          component: VueErekAvatarList,
          meta: {
            keepAlive: false
          }
        },
        // 错误页
        {
          path: 'erek-exception/403',
          name: 'VueErekException403',
          component: VueErekException403,
          meta: {
            keepAlive: false
          }
        },
        {
          path: 'erek-exception/404',
          name: 'VueErekException404',
          component: VueErekException404,
          meta: {
            keepAlive: false
          }
        },
        {
          path: 'erek-exception/500',
          name: 'VueErekException500',
          component: VueErekException500,
          meta: {
            keepAlive: false
          }
        },
        // 飞机管理
        {
          path: 'erek-plane',
          name: 'PlaneRouter',
          component: PlaneRouter,
          redirect: '/erek-manage/erek-plane/add-plane-position',
          children: [
            {
              path: 'add-plane-position',
              name: 'PlanePosition',
              component: PlanePosition,
              meta: {
                keepAlive: false
              }
            },
            {
              path: 'add-plane-time',
              name: 'PlaneTime',
              component: PlaneTime,
              meta: {
                keepAlive: false
              }
            },
            {
              path: 'plane-list',
              name: 'PlaneListComponents',
              component: PlaneListComponents,
              meta: {
                keepAlive: false
              }
            }
          ]
        },
        // 火车管理
        {
          path: 'erek-train',
          name: 'TrainRouter',
          component: TrainRouter,
          redirect: '/erek-manage/erek-train/add-train-position',
          children: [
            {
              path: 'add-train-position',
              name: 'TrainPosition',
              component: TrainPosition,
              meta: {
                keepAlive: false
              }
            },
            {
              path: 'add-train-time',
              name: 'TrainTime',
              component: TrainTime,
              meta: {
                keepAlive: false
              }
            },
            {
              path: 'train-list',
              name: 'TrainListComponents',
              component: TrainListComponents,
              meta: {
                keepAlive: false
              }
            }
          ]
        },
        // 汽车管理
        {
          path: 'erek-bus',
          name: 'BusRouter',
          component: BusRouter,
          redirect: '/erek-manage/erek-bus/add-bus-position',
          children: [
            {
              path: 'add-bus-position',
              name: 'BusPosition',
              component: BusPosition,
              meta: {
                keepAlive: false
              }
            },
            {
              path: 'add-bus-time',
              name: 'BusTime',
              component: BusTime,
              meta: {
                keepAlive: false
              }
            },
            {
              path: 'bus-list',
              name: 'BusListComponents',
              component: BusListComponents,
              meta: {
                keepAlive: false
              }
            }
          ]
        },
        // 城市管理
        {
          path: 'erek-city',
          name: 'CityRouter',
          component: CityRouter,
          redirect: '/erek-manage/erek-city/add-city',
          children: [
            {
              path: 'add-city',
              name: 'CityComponents',
              component: CityComponents,
              meta: {
                keepAlive: false
              }
            },
            {
              path: 'city-list',
              name: 'CityListComponents',
              component: CityListComponents,
              meta: {
                keepAlive: false
              }
            }
          ]
        },
        // 查询管理
        {
          path: 'erek-search',
          name: 'SearchRouter',
          component: SearchRouter,
          redirect: '/erek-manage/erek-search/simple',
          children: [
            {
              path: 'simple',
              name: 'SimpleSearch',
              component: SimpleSearch,
              meta: {
                keepAlive: false
              }
            },
            {
              path: 'ticket-code',
              name: 'TicketCodeSearch',
              component: TicketCodeSearch,
              meta: {
                keepAlive: false
              }
            }
          ]
        },
        // 部门管理
        {
          path: 'erek-department/list',
          name: 'DepartmentComponents',
          component: DepartmentComponents,
          meta: {
            keepAlive: false
          }
        },
        // 员工管理
        {
          path: 'erek-staff/list',
          name: 'StaffComponents',
          component: StaffComponents,
          meta: {
            keepAlive: false
          }
        },
        // 个人页
        {
          path: 'erek-user/user-info',
          name: 'UserComponents',
          component: UserComponents,
          meta: {
            keepAlive: false
          }
        },
        {
          path: 'erek-user/setting',
          name: 'VueErekUserSetting',
          component: VueErekUserSetting,
          meta: {
            keepAlive: false
          }
        }
      ],
      meta: {
        keepAlive: false
      }
    }
  ]
})
export default router
