import axios from 'axios';
import { getCurrentTimestamp } from '~~/server/utils/tool';

export async function getRobotInfoByRobotId(robotId: string) {
    let data = {
        "request_timestamp_ms": getCurrentTimestamp(),
        "robot_id": robotId
    };
    const res = await axios.post("/api/chatbot/get-robot-info-by-robot-id", data);
    return res.data
}

export async function getAllRobot() {
    const userStore = useUserStore();
    const robotStore = useRobotStore();
    let data = {
        "user_id": userStore.user.userId,
        "request_timestamp_ms": getCurrentTimestamp(),
    };
    const res = await axios.post("/api/chatbot/get-all-robot", data);
    robotStore.setRobotsInfo(res.data.data);
    return res.data
}

export async function getPrivateDownloadUrl(key: string): Promise<string> {
    let res = await axios.post('/api/download/privateDownloadUrl', { key: key })
    return res.data.url
}

