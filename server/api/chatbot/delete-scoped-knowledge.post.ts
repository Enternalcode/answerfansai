import { deleteScopedKnowledge } from "~~/server/service/chatbot";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    return deleteScopedKnowledge(body);
});