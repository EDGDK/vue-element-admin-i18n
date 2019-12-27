import store from '@/store'
import Layout from '@/layout'

/**
 * @param {Array} value
 * @returns {Boolean}
 * @example see @/views/permission/directive.vue
 */
export default function checkPermission(value) {
  if (value && value instanceof Array && value.length > 0) {
    const roles = store.getters && store.getters.roles
    const permissionRoles = value

    const hasPermission = roles.some(role => {
      return permissionRoles.includes(role)
    })

    if (!hasPermission) {
      return false
    }
    return true
  } else {
    console.error(`need roles! Like v-permission="['admin','editor']"`)
    return false
  }
}

/**
 * 后台查询的菜单数据拼装成路由格式的数据
 * @param {Array} routes
 * @param {Object} data
 * @returns {routes}
 * @example see @/src/store/modulues/permission.js
 */
export function generaMenu(routes, data) {
  data.forEach(item => {
    // alert(JSON.stringify(item))
    /* eslint-disable */
    const menu = {
      path: item.isRoot ? '/' + item.path : item.path,
      component: item.isRoot ? Layout : () => import(`@/views${item.url}`),
      // hidden: true,
      children: [],
      alwaysShow: !!item.children, 
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