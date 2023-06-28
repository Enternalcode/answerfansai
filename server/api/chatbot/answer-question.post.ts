import { answerQuestion } from "../../service/chatbot";


export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    return answerQuestion(body);
})