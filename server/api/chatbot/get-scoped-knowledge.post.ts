import { getScopedKnowledge } from "~~/server/service/chatbot";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    return getScopedKnowledge(body);
})