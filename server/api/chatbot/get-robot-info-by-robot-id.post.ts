import { getRobotInfoByRobotId } from "~~/server/service/chatbot";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    return getRobotInfoByRobotId(body);
})