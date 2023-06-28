import { synchronizationUserInfo } from '../../service/av'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const headers = getHeaders(event)

    return synchronizationUserInfo(body, headers)
})
