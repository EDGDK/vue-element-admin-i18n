import Vue from 'vue'
import store from '@/store'
/*
  * 自定义指令-校验权限
*/
export function buttonPermission() {
  Vue.directive('permit', {
    inserted(el, binding) {
      // 一行三目运算符就可
      !store.getters.roles.includes(binding.value) ? el.parentNode && el.parentNode.removeChild(el) : {}
    }
  })
}
