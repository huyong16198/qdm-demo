let BASE_URL = "";
switch (process.env.VUE_APP_TITLE) {
case 'develop':
  BASE_URL = "http://localhost:3000"; //开发环境
  break;
case 'qa':
  BASE_URL = "https://api-qa.test.cn"; //qa测试环境
  break;
case 'uat':
  BASE_URL = "https://api-uat.test.cn"; //uat测试环境
  break;
case 'gray':
  BASE_URL = "https://api-gray.test.cn"; //灰度测试环境
  break;
default:
  BASE_URL = "https://api.test.cn"; //生产环境
  break;
}
module.exports = BASE_URL;