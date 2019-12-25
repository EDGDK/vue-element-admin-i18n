import { constantRoutes } from '@/router'
// import { asyncRoutes, constantRoutes } from '@/router'
import { getAuthMenu } from '@/api/user'
import Layout from '@/layout'
import { getToken } from '@/utils/auth'
import { Message } from 'element-ui'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 后台查询的菜单数据拼装成路由格式的数据
 * @param routes
 */
export function generaMenu(routes, data) {
  data.forEach(item => {
    // alert(JSON.stringify(item))
    /* eslint-disable */
    const menu = {
      path: item.url,
      component: item.isRoot ? Layout : () => import(`@/views${item.url}`),
      // hidden: true,
      children: [],
      alwaysShow: !!item.isRoot, 
      name: item.name,
      meta: { title: item.menu_name, id: item.menu_id, icon: item.icon === '#' ? 'documentation' : item.icon, roles: item.roles ? item.roles : ['admin'] }
    }
    /* eslint-disable */
    if (item.children) {
      generaMenu(menu.children, item.children)
    }
    routes.push(menu)
  })
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  asyncRoutesList: {
    hasDone: false,
    list: []
  },
  routes: [],
  token: getToken(),
  addRoutes: []
}

const mutations = {
  SET_ASYNCROUTESLIST: (state, list) => {
    state.asyncRoutesList.hasDone = true
    state.asyncRoutesList.list = list
  },
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(async resolve => {
      // let accessedRoutes
      // if (roles.includes('admin')) {
      //   accessedRoutes = asyncRoutes || []
      // } else {
      //   accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      // }
      // commit('SET_ROUTES', accessedRoutes)
      // resolve(accessedRoutes)

      // 先查询后台并返回左侧菜单数据并把数据添加到路由
      // const loadMenuData = []
      // getAuthMenu(state.token).then(response => {
      //   let data = response
      //   if (response.code !== 20000) {
      //     Message.error({
      //       message: '菜单数据加载异常'
      //     })
      //   } else {
      //     data = response.data.menuList
      //     Object.assign(loadMenuData, data)
      //     generaMenu(asyncRoutes, loadMenuData)
      //     console.log(asyncRoutes)
      //     let accessedRoutes
      //     if (roles.includes('admin')) {
      //       // alert(JSON.stringify(asyncRoutes))
      //       accessedRoutes = asyncRoutes || []
      //     } else {
      //       accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      //     }
      //     commit('SET_ROUTES', accessedRoutes)
      //     resolve(accessedRoutes)
      //   }
      //   // generaMenu(asyncRoutes, data)
      // }).catch(error => {
      //   console.log(error)
      // })
      let accessedRoutes
      let asyncRoutesList = []
      if (state.asyncRoutesList.hasDone) {
        asyncRoutesList = state.asyncRoutesList.list
      } else {
        const loadMenuData = []
        await getAuthMenu(state.token).then(response => {
          let data = response
          if (response.code !== 20000) {
            Message.error({
              message: '菜单数据加载异常'
            })
          } else {
            data = response.data.menuList
            Object.assign(loadMenuData, data)
            generaMenu(asyncRoutesList, loadMenuData)
            // 404 page must be placed at the end !!!
            asyncRoutesList.push({ path: '*', redirect: '/404', hidden: true })
          }
        })
        commit('SET_ASYNCROUTESLIST', asyncRoutesList)
      }
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutesList || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutesList, roles)
      }
      commit('SET_ROUTES', accessedRoutes)

      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
