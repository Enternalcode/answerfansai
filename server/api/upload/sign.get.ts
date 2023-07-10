import { getSign } from '../../service/qiniu'

export default defineEventHandler(async (event: any) => {
    return getSign(event)
})
