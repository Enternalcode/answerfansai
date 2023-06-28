import { wxPayQrcode } from "../../service/pay"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    return wxPayQrcode(body)
})