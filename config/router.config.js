export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
      {
        component: '404',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      //农业推广
      {
        path: '/',
        redirect: '/news/dataLib',
      },

      // router redirect Component
      // {
      //   path: '/',
      //   component: './News/RedirectPage',
      // },

      {
        name: 'news',
        icon: 'home',
        path: '/news',
        routes: [
          {
            path: '/news/dataLib',
            name: 'dataLib',
            icon: 'database',
            component: './News/DataLib',
          },
          {
            path: '/news/policy',
            name: 'policy',
            icon: 'icon-icon_xinyong_xianxing_jijin-',
            component: './News/Policy',
            // hideInMenu: true
          },
          {
            path: '/news/video',
            name: 'video',
            icon: 'youtube',
            component: './News/Video',
          },
          {
            path: '/news/video/details',
            // name: 'details',
            component: './articleInfo/details',
            hideInMenu: true,
          },
          {
            component: '404',
          },
        ],
      },
      // 农业动态
      {
        name: 'dynamics',
        icon: 'appstore',
        path: '/dynamics',
        routes: [
          {
            path: '/dynamics/dynamics',
            name: 'dynamics',
            icon: 'appstore',
            component: './Dynamics/Dynamics',
          },
          {
            path: '/dynamics/dynamics/details',
            // name: 'details',
            component: './articleInfo/details',
            hideInMenu: true,
          },
          {
            path: '/dynamics/themeEdu',
            name: 'themeEdu',
            icon: 'icon-dongtai1',
            component: './Dynamics/ThemeEdu',
          },
          {
            path: '/dynamics/themeEdu/details',
            // name: 'details',
            component: './articleInfo/details',
            hideInMenu: true,
          },


          {
            path: '/dynamics/department',
            name: 'department',
            icon: 'icon-dongtai',
            component: './Dynamics/Department',
          },

          {
            path: '/dynamics/count',
            name: 'count',
            icon: 'icon-hangyedongtai1',
            component: './Dynamics/Count',
          },

          {
            component: '404',
          },
        ],
      },

      // 便民服务
      {
        name: 'services',
        icon: 'icon-xiaoshoudongtai',
        path: '/services',
        routes: [
          {
            path: '/services/forecast',
            name: 'forecast',
            icon: 'fund',
            component: './Services/Forecast',
          },
          {
            path: '/services/forecast/details',
            // name: 'details',
            component: './common/details',
            hideInMenu: true,
          },
          {
            path: '/services/contract',
            name: 'contract',
            icon: 'container',
            component: './Services/Contract',
          },

          {
            path: '/services/contract/details',
            // name: 'details',
            component: './common/details',
            hideInMenu: true,
          },

          {
            path: '/services/column',
            name: 'column',
            icon: 'calendar',
            component: './Services/Column',
            // hideInMenu: true
          },

          {
            component: '404',
          },
        ],
      },



      // 行情监测
      {
        name: 'monitor',
        icon: 'icon-neirongjiance',
        path: '/monitor',
        routes: [
          {
            path: '/monitor',
            component: './Monitor',
          },
          {
            path: '/monitor/details',
            component: './articleInfo/details',
            hideInMenu: true,
          }
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
