import axios from "axios";
import { SERVICE_CONFIG } from "../config/vars";
import { generateBKHeader } from "../utils/request";

function getServerURL(env = SERVICE_CONFIG.env) {
    if (env === "dev") {
        return SERVICE_CONFIG.testServerURL;
    } else {
        return SERVICE_CONFIG.serverURL + '/release';
    }
}

async function testPostConnect(body) {
    let baseURL = getServerURL();
    let path = '/test-post'
    let url = baseURL + path
    let data = body
    const headers = generateBKHeader(SERVICE_CONFIG.apiAppKey, SERVICE_CONFIG.apiAppSecret, data, path)
    const response = await axios.post(url, data, { headers: headers })
    return response.data;
}


async function answerQuestion(body) {
    let baseURL = getServerURL();
    let path = '/v1/customer-service-robot/robot/answer-question'
    let url = baseURL + path
    let data = {
        "user_id": body.user_id,
        "robot_id": body.robot_id,
        "request_timestamp_ms": body.request_timestamp_ms,
        "messages": body.messages,
        "max_tokens": body.max_tokens,
        "search_limit": body.search_limit,
        "hit_score_threshold": body.hit_score_threshold,
        "carry_related_scoped_knowledge": body.carry_related_scoped_knowledge,
    }
    const headers = generateBKHeader(SERVICE_CONFIG.apiAppKey, SERVICE_CONFIG.apiAppSecret, data, path)
    const response = await axios.post(url, data, { headers: headers });
    return response.data;
}

/**!SECTION
 * 
 */
async function chatbotAsk(body) {
    let baseURL = getServerURL();
    let path = '/v1/customer-service-robot/gpt/chat-completions';
    let url = baseURL + path
    let data = {
        "scoped_knowledge": body.scoped_knowledge,
        "messages": body.messages,
        "max_tokens": body.max_tokens,
    }
    const headers = generateBKHeader(SERVICE_CONFIG.apiAppKey, SERVICE_CONFIG.apiAppSecret, data, path)
    const response = await axios.post(url, data, { headers: headers })
    return response.data;
}

/**!SECTION
 * 
 */
async function createChatbot(body) {
    let baseURL = getServerURL();
    let path = '/v1/customer-service-robot/robot/create';
    let url = baseURL + path
    let data = {
        "user_id": body.user_id,
        "request_timestamp_ms": body.request_timestamp_ms,
        "robot_name": body.robot_name,
        "robot_type": body.robot_type,
    }
    const headers = generateBKHeader(SERVICE_CONFIG.apiAppKey, SERVICE_CONFIG.apiAppSecret, data, path)
    const response = await axios.post(url, data, { headers: headers });
    return response.data;
}

async function getScopedKnowledge(body) {
    let baseURL = getServerURL();
    let path = '/v1/customer-service-robot/robot/get-scoped-knowledge-by-user-and-robot';
    let url = baseURL + path
    let data = {
        "user_id": body.user_id,
        "robot_id": body.robot_id,
        "request_timestamp_ms": body.request_timestamp_ms,
        "limit": body.limit,
    }
    const headers = generateBKHeader(SERVICE_CONFIG.apiAppKey, SERVICE_CONFIG.apiAppSecret, data, path)
    const response = await axios.post(url, data, { headers: headers });
    return response.data;
}

async function getAllRobotByUserId(body) {
    let baseURL = getServerURL();
    let path = '/v1/customer-service-robot/robot/get-all-robot-by-user-id';
    let url = baseURL + path
    let data = {
        "user_id": body.user_id,
        "request_timestamp_ms": body.request_timestamp_ms,
    }
    const headers = generateBKHeader(SERVICE_CONFIG.apiAppKey, SERVICE_CONFIG.apiAppSecret, data, path)
    const response = await axios.post(url, data, { headers: headers });
    return response.data;
}

async function deleteScopedKnowledge(body) {
    let baseURL = getServerURL();
    let path = '/v1/customer-service-robot/robot/delete-scoped-knowledge';
    let url = baseURL + path
    let data = {
        "user_id": body.user_id,
        "request_timestamp_ms": body.request_timestamp_ms,
        "robot_id": body.robot_id,
        "digest": body.digest,
    }
    const headers = generateBKHeader(SERVICE_CONFIG.apiAppKey, SERVICE_CONFIG.apiAppSecret, data, path)
    const response = await axios.post(url, data, { headers: headers })
    return response.data;
}

async function addScopedKnowledge(body) {
    let baseURL = getServerURL();
    let path = '/v1/customer-service-robot/robot/add-scoped-knowledge';
    let url = baseURL + path
    let data = {
        "user_id": body.user_id,
        "request_timestamp_ms": body.request_timestamp_ms,
        "robot_id": body.robot_id,
        "scoped_knowledge": body.scoped_knowledge,
    }
    const headers = generateBKHeader(SERVICE_CONFIG.apiAppKey, SERVICE_CONFIG.apiAppSecret, data, path)
    const response = await axios.post(url, data, { headers: headers });
    return response.data;
}

export { addScopedKnowledge, answerQuestion, chatbotAsk, createChatbot, deleteScopedKnowledge, getAllRobotByUserId, getScopedKnowledge, testPostConnect };

