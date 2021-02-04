/**
 * @param  file         图片文件  require: true
 * @param  targetWidth  图像压缩生成的宽度 default: 1280
 * @param  targetHeight 图像压缩生成的高度 default: 960
 * @param  size         是否执行压缩阀值 default: 1024*1024*2(2M)
 * @param  returnFile   是否返回file文件 default: true
 * @param  quality      压缩生成图片质量 default: 0.92   limit(0-1) propsType: Number
 *                      图片格式为 image/jpeg 或 image/webp的情况下，quality取值可以从 0 到 1 的区间内选择图片的质量
 *                      如果超出取值范围，将会使用默认值 0.92。其他参数会被忽略
 * @returns             file / base64   defaul: file
 */
function compress ({file, targetWidth=1280, targetHeight=960, size=1024*1024*2, returnFile=true, quality=0.92}) {
  return new Promise((resolve, reject) => {
    if (!file) return reject('请选择文件');
    if (typeof quality !== 'number') {
      return reject(`图像质量参数类型错误,should number not ${typeof quality}`);
    }
    if (file.type.indexOf('image/') !== 0) return reject('请上传图片格式文件');
    if (file.size <= size) return resolve(file);
    let canvas = document.createElement('canvas');
    if (!canvas || !canvas.getContext) return reject('浏览器不支持canvas');
    let context = canvas.getContext('2d');
    if (!window.FileReader) return reject('浏览器不支持FileReader');
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      let img = new Image();
      img.src = e.target.result;
      img.onload = function () {
        // init:W/H 源照片宽/高
        let initWidth = img.width,
          initHeight = img.height;
        // 压缩后宽高大于源图片宽高不执行压缩
        if (targetWidth > initWidth && targetHeight > initHeight) return resolve(file);
        /*
          压缩后宽高中一项小于源图片宽高 取小于项并保持原图片的宽高比
        */
        if (targetWidth > initWidth) {
          targetWidth = parseInt(initWidth * targetHeight / initHeight);
        }
        if (targetHeight > initHeight) {
          targetHeight = parseInt(targetWidth * initHeight / initWidth);
        }
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        context.drawImage(img, 0, 0, targetWidth, targetHeight);
        if (returnFile) {
          canvas.toBlob(blob => {resolve(new File([blob], file.name, { type: file.type, lastModified: Date.now() }));}, file.type, quality);
        } else {
          resolve(canvas.toDataURL(file.type, quality));
        }
      };
    };
  });
}
export default compress;