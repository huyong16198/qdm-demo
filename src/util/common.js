import { Message } from 'element-ui';
export default {
  ossExcelDownload (url) {
    const link = document.createElement('a');
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    Message.success('导出成功');
  }
};