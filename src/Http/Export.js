import {
  Message,
  Loading,
  Notification
} from 'element-ui';
import router from '../router';
const qs = require('qs');
const axios = require('axios');
import BASE_URL from './apiPort';
const instance = axios.create({
  baseURL: BASE_URL,
  // timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  withCredentials: false,
  responseType: 'blob'
});

const Axios = (type, url, params, Timeout) => {
  url = url.toLowerCase();
  instance.defaults.timeout = Timeout > 100000000 ? Timeout : 300000;
  instance.defaults.headers.common['Authorization'] = sessionStorage.getItem(
    'token'
  ) ?
    `Bearer ${sessionStorage.getItem('token')}` :
    '';
  instance.defaults.headers['WmsCode'] = sessionStorage.getItem('wareHouse') ? sessionStorage.getItem('wareHouse') : '';
  if (type.toLowerCase() === 'get' || type.toLowerCase() === 'delete') {
    url = params ? `${url}?${qs.stringify(params, { indices: false })}` : url;
  }
  return instance[type](url, params);
};
export function exportApi(type, url, params, Timeout, format) {
  return new Promise((resolve, reject) => {
    let loadingInstance = Loading.service({
      text: '加载中...',
      lock: true,
      background: 'rgba(255, 255, 255, 0)'
    });
    Axios(type, url, params, Timeout, format)
      .then(response => {
        loadingInstance.close();
        if (response.data.type === 'application/json') {
          var reader = new FileReader();
          reader.onload = e => {
            Notification.error(`${JSON.parse(e.target.result).Message}`);
          };
          reader.readAsText(response.data);
        } else {
          let blob = new Blob([response.data],  {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
          });
          const link = document.createElement('a');
          link.style.display = 'none';
          link.href = URL.createObjectURL(blob);
          let dcName = JSON.parse(sessionStorage.getItem('wareHouseList')).filter( i => i.Code === sessionStorage.getItem('wareHouse'))[0]['Name'];
          let M = new Date().getMonth() + 1;
          let D = new Date().getDate();
          let fileName = params.fileName
            ? params.fileName.indexOf('.') > 0 ? params.fileName
              :  `${params.fileName}.xlsx` : '';
          link.download = fileName
            ? `${dcName}-${fileName.split('.')[0]}${M > 9 ? M : ('0' + M)}${D > 9 ? D : ('0' + D)}.${fileName.split('.')[1]}`
            : `${new Date().getTime()}.${format ? format : 'xlsx'}`;
          document.body.appendChild(link);
          link.click();
          URL.revokeObjectURL(link.href); // 释放 Blob 对象
          document.body.removeChild(link);
          Message.success('导出成功');
        }
      })
      .catch(err => {
        loadingInstance.close();
        if (err.code === 'ECONNABORTED') {
          Notification.error('请求超时,请重新再试');
        }
        if (err.message === 'Network Error') {
          Notification.error('网络错误');
        }
        if (err && err.response) {
          switch (err.response.status) {
          case 401:
            Notification.error('权限认证失败');
            setTimeout(() => {
              sessionStorage.clear();
              router.push('/login');
            }, 1000);
            break;
          case 403:
            Notification.error('无访问权限');
            break;
          default:
            Notification.error(`系统异常${err.response.status},请联系管理员`);
          }
        }
        reject(err);
      });
  });
}
