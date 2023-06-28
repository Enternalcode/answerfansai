import md5 from 'crypto-js/md5.js';
// import md5 from 'md5';
import { YUNGOU } from '../config/vars';

/**
 * 生成第三方支付平台需要的签名
 * @param {*} transParams
 * @returns
 */
async function yungouSign(transParams) {
    const paramsArr = Object.keys(transParams);
    paramsArr.sort();
    const stringArr = []
    const key = YUNGOU.YUNGOUOS_KEY;
    paramsArr.map(key => {
        stringArr.push(key + '=' + transParams[key]);
    })
    stringArr.push("key=" + key)
    const str = stringArr.join('&');
    let signStr = md5(str).toString().toUpperCase();
    return signStr
}

export { yungouSign };
