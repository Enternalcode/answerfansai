import { http } from '../utils/request'
import { yungouSign } from '../utils/md5';
import { YUNGOU } from '../config/vars';

/**
 * 获取二维码支付链接
 * @param  req
 * @returns
 */
async function wxPayQrcode(body) {
    console.log("body:", body)
    const name = body.name || YUNGOU.default_name
    const fee = body.fee
    const attach = body.attach
    // 签名的参数准备
    const dateTime = new Date().getTime()
    let transParams = {
        "out_trade_no": "ddmt" + dateTime,
        "total_fee": fee,
        "mch_id": YUNGOU.mch_id,
        "body": name
    }
    // 最后加上 商户Key
    const signValue = await yungouSign(transParams);
    transParams["sign"] = signValue
    transParams["notify_url"] = YUNGOU.notify_url
    transParams["attach"] = attach

    // 获取yungouos的返回二维码信息
    const url = YUNGOU.api_url

    console.log("请求前参数：", url, transParams)
    let mdResult = await http.post({url, params: transParams})
    console.log("返回二维码:" ,mdResult.data)
    return mdResult;
}



export {wxPayQrcode}
