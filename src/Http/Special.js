import {
  Message,
  Loading,
  Notification
} from 'element-ui';
import md5 from "js-md5";
const qs = require('qs');
const axios = require('axios');
import BASE_URL from './apiPort';
const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: false
});
// 加密code规则
const AuthCode = (secretKey = 'GzQDm') => {
  const randomString = (length, chars) => {
    let result = "";
    for (var i = length; i > 0; --i) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
  };
  const nonce = randomString(20, "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");
  return `${nonce} ${md5(nonce + secretKey)}`;
};
const Axios = (methods = '', type, url, params, Timeout) => {
  url = url.toLowerCase();
  instance.defaults.headers.common['Authorization'] = AuthCode();
  instance.defaults.timeout = Timeout > 100000000 ? Timeout : 300000;
  instance.defaults.responseType = methods === 'export' ? 'blob' : 'json';
  instance.defaults.headers.common['Content-Type'] = methods === 'upload' ? 'multipart/form-data' : 'application/json;charset=utf-8';
  if (type.toLowerCase() === 'get' || type.toLowerCase() === 'delete') {
    url = params ? `${url}?${qs.stringify(params, { indices: false })}` : url;
  }
  return instance[type](url, params);
};
export function specialApi(methods,type, url, params, Timeout, format) {
  return new Promise((resolve, reject) => {
    const loadingInstance = Loading.service({
      text: '加载中...',
      lock: true,
      background: 'rgba(255, 255, 255, 0)'
    });
    Axios(methods, type, url, params, Timeout, format)
      .then(response => {
        loadingInstance.close();
        if (methods === 'export') {
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
            link.download = params.fileName ? params.fileName : `${new Date().getTime()}.${format ? format : 'xlsx'}`;
            document.body.appendChild(link);
            link.click();
            URL.revokeObjectURL(link.href);
            document.body.removeChild(link);
            Message.success('导出成功');
            resolve(params);
          }
        } else {
          if (response.data.Success) {
            resolve(response.data.Object);
          } else {
            reject(response.data.Status);
            Notification[`${response.data.Code === 0 ? 'warning' : 'error'}`](response.data.Message);
          }
        }
      })
      .catch(err => {
        loadingInstance.close();
        if (err.code === "ECONNABORTED") return Notification.error("请求超时,请重新再试");
        if (err.message === "Network Error") return Notification.error("请检查网络连接状态");
        Message.error({
          title: "HTTP状态信息",
          dangerouslyUseHTMLString: true,
          duration: 3000,
          message: `
            <p><strong>调用地址:</strong>${err.response.config.url}</p>
            <p><strong>调用方式:</strong>${err.response.config.method}</p>
            <p><strong>请求参数:</strong>${err.response.config.data}</p>
            <p><strong>请求头令牌:</strong>${AuthCode()}</p>
            <p><strong>HTTP通信状态:</strong>${err.response.status}</p>
            <p><strong>HTTP通信说明:</strong>${err.response.statusText}</p>`
        });
        reject(err);
      });
  });
}
