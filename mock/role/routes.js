// Just a mock data
// import { getAuthMenu } from '@/api/user'
// import { getToken } from '@/utils/auth'
// import { generaMenu } from '@/utils/permission'
// const token = getToken()
// let asyncRoutesList

// getAuthMenu(token).then(response => {
//   let data = response
//   const loadMenuData = []
//   if (response.code === 20000) {
//     data = response.data.menuList
//     Object.assign(loadMenuData, data)
//     generaMenu(asyncRoutesList, loadMenuData)
//     // 404 page must be placed at the end !!!
//     asyncRoutesList.push({ path: '*', redirect: '/404', hidden: true })
//   }
// })
export const constantRoutes = [
  {
    path: '/redirect',
    component: 'layout/Layout',
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: 'views/redirect/index'
      }
    ]
  },
  {
    path: '/login',
    component: 'views/login/index',
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: 'views/login/auth-redirect',
    hidden: true
  },
  {
    path: '/404',
    component: 'views/error-page/404',
    hidden: true
  },
  {
    path: '/401',
    component: 'views/error-page/401',
    hidden: true
  },
  {
    path: '',
    component: 'layout/Layout',
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: 'views/dashboard/index',
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/nested',
    component: 'layout/Layout',
    redirect: '/nested/menu1/menu1-1',
    name: 'Nested',
    meta: {
      title: 'nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: 'views/nested/menu1/index', // Parent router-view
        name: 'Menu1',
        meta: { title: 'menu1' },
        redirect: '/nested/menu1/menu1-1',
        children: [
          {
            path: 'menu1-1',
            component: 'views/nested/menu1/menu1-1',
            name: 'Menu1-1',
            meta: { title: 'menu1-1' }
          },
          {
            path: 'menu1-2',
            component: '/views/nested/menu1/menu1-2',
            name: 'Menu1-2',
            redirect: '/nested/menu1/menu1-2/menu1-2-1',
            meta: { title: 'menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: 'views/nested/menu1/menu1-2/menu1-2-1',
                name: 'Menu1-2-1',
                meta: { title: 'menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: 'views/nested/menu1/menu1-2/menu1-2-2',
                name: 'Menu1-2-2',
                meta: { title: 'menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: 'views/nested/menu1/menu1-3',
            name: 'Menu1-3',
            meta: { title: 'menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        name: 'Menu2',
        component: 'views/nested/menu2/index',
        meta: { title: 'menu2' }
      }
    ]
  },
  {
    path: '/permission',
    component: 'layout/Layout',
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: 'permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: 'views/permission/page',
        name: 'PagePermission',
        meta: {
          title: 'pagePermission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: 'views/permission/directive',
        name: 'DirectivePermission',
        meta: {
          title: 'directivePermission'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'function',
        component: 'views/permission/function',
        name: 'FunctionPermission',
        meta: {
          title: 'functionPermission',
          roles: ['admin']
        }
      },
      {
        path: 'role',
        component: 'views/permission/role',
        name: 'RolePermission',
        meta: {
          title: 'rolePermission',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/guide',
    component: 'layout/Layout',
    redirect: '/guide/index',
    children: [
      {
        path: 'index',
        component: 'views/guide/index',
        name: 'Guide',
        meta: { title: 'guide', icon: 'guide', noCache: true }
      }
    ]
  }
]
export const asyncRoutes = [
  {
    path: '/system',
    alwaysShow: true,
    name: 'system',
    component: 'layout/Layout',
    meta: { title: 'system', icon: 'documentation', roles: ['admin'] },
    children: [{
      path: 'user',
      name: 'systemUser',
      component: 'views/system/user',
      meta: { title: 'systemUser', icon: 'documentation' }
    },
    {
      path: 'system1',
      name: 'system1',
      component: '/system1',
      alwaysShow: true,
      meta: { title: 'system1', icon: 'documentation' },
      children: [{
        path: 'person',
        name: 'system1Person',
        component: 'views/system1/person',
        meta: { title: 'system1Person', icon: 'documentation' }
      }]
    }]
  },
  {
    path: '/systemData',
    alwaysShow: true,
    name: 'systemData',
    component: 'layout/Layout',
    meta: { title: 'systemData', icon: 'documentation', roles: ['admin'] },
    children: [{
      path: 'monitor',
      name: 'systemDataMonitor',
      component: 'views/systemData/monitor',
      meta: { title: 'systemDataMonitor', icon: 'documentation' }
    }]
  },
  { path: '*', redirect: '/404', hidden: true }
]
