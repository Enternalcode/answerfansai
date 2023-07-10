import { getPrivateDownloadUrl } from '../../service/qiniu'

export default defineEventHandler(async (event: any) => {
    const body = await readBody(event)
    return getPrivateDownloadUrl(body)
})