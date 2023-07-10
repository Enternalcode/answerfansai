import axios from "axios";
import * as qiniu from 'qiniu-js';

// 请求接口上传图片
export async function uploadFile(file: File) {
    let res = await axios.get('/api/upload/sign')
    const uptoken = res.data.token
    const key = file.name;
    const config = {
        useCdnDomain: true,
        region: qiniu.region.as0,
        forceDirect: true // 是否上传全部采用直传方式
    };
    const putExtra: any = {
        fname: file.name, //文件原文件名
        mimeType: ['image/png', 'image/jpeg', 'image/gif'] //用来限制上传文件类型，为 null 时表示不对文件类型限制；
    };
    return qiniu.upload(file, null, uptoken, putExtra, config);
}
