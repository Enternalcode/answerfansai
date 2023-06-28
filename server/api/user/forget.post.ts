import {forgetUser} from '../../service/av'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    return forgetUser(body)
})
