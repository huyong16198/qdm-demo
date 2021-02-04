import Vue from 'vue';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App';
import router from './router';
import element from './elements/component';
import util from "./assets/base/util.js";
import '@/assets/iconfont/iconfont.css';
import filters from './util/filters';
import common from './util/common';

Vue.use(element);
Vue.config.productionTip = false;
Vue.prototype.util = util;
Vue.prototype.common = common;
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));


// Vue.directive(
//   'watermark',
//   (El, binding) => {
//     let binds = binding.value
//     var can = document.createElement('canvas')
//     El.appendChild(can)
//     can.width = 400
//     can.height = 300
//     can.style.display = 'none'
//     var cans = can.getContext('2d')
//     cans.rotate(-15 * Math.PI / 180)
//     cans.font = binds.font || "14px Microsoft JhengHei"
//     cans.fillStyle = binds.textColor || "rgba(200, 200, 200, 0.1)"
//     cans.textAlign = 'left'
//     cans.textBaseline = 'Middle'
//     cans.fillText(binds.text, can.width / 3, can.height / 2);
//     var div = document.createElement('div')
//     div.style.pointerEvents = 'none'
//     div.style.top = '70px'
//     div.style.left = '30px'
//     div.style.position = 'fixed'
//     div.style.zIndex = '100000'
//     div.style.width = document.documentElement.clientWidth - 200 + 'px'
//     div.style.height = document.documentElement.clientHeight - 100 + 'px'
//     div.style.background = 'url(' + can.toDataURL('image/png') + ') left bottom repeat'
//     El.appendChild(div)
//   }
// )

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');