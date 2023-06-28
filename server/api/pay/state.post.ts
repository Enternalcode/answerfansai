import { queryPayOrder } from '../../service/av'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    return queryPayOrder(body)
})
