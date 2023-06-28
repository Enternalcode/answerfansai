import { chatbotAsk } from "../../service/chatbot";


export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    return chatbotAsk(body);
})