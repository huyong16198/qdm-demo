import {
  Loading,
  Notification
} from 'element-ui';
import router from '../router';
const qs = require('qs');
const axios = require('axios');
import BASE_URL from './apiPort';
const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  withCredentials: false
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
export function uploadApi(type, url, params, Timeout) {
  return new Promise((resolve, reject) => {
    let loadingInstance = Loading.service({
      text: '加载中...',
      lock: true,
      background: 'rgba(255, 255, 255, 0)'
    });
    Axios(type, url, params, Timeout)
      .then(response => {
        loadingInstance.close();
        if (response.data.Success) {
          resolve(response.data.Object);
        } else {
          Notification.error(response.data.Message);
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