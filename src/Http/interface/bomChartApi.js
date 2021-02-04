import {api} from '../Request';
import { exportApi } from '../Export';
import { uploadApi } from '../Upload';
export const GoodExtPagedList = params => api('post', '/foundation/GoodExt/PagedList', params);
export const GoodExtExport = (params, time) => exportApi('post', '/excel/GoodExt/Export', params, time);
export const GoodExtImport = params => uploadApi('post', '/excel/GoodExt/Import', params);