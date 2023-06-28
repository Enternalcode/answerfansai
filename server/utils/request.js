'use strict'

import axios from 'axios';
import crypto from 'crypto';

function sendRequest({ method, url, params = {}, data = {}, headers = {} }) {
    return axios({
        method,
        url,
        params,
        data,
        headers
    }).then((response) => {
        return response.data
    }).catch(error => {
        console.log("error:", error);
        const response = error.response
        return response || {}
    })
}
const http = {
    get({ url, params, headers }) {
        return sendRequest({ method: 'get', url, params, headers })
    },
    post({ url, data, headers, params }) {
        return sendRequest({ method: 'post', url, params: params, data: data, headers })
    },
    patch(url, params) {
        return sendRequest({ method: 'patch', url, data: params })
    },
    put(url, params, headers) {
        return sendRequest({ method: 'put', url, data: params, headers })
    },
    delete(url, params) {
        return sendRequest({ method: 'delete', url, params })
    }
}

function generateBKSign(apiAppKey, apiAppSecret, dateTime, method, headersAccept, headerContentType, path, contentMD5) {
    const signingStr = [
        `x-date: ${dateTime}`,
        method,
        headersAccept,
        headerContentType,
        contentMD5,
        path,
    ].join('\n')
    const signing = crypto.createHmac('sha1', apiAppSecret).update(signingStr, 'utf8').digest('base64')
    const sign = `hmac id="${apiAppKey}", algorithm="hmac-sha1", headers="x-date", signature="${signing}"`
    return sign
}

function generateBKHeader(apiAppKey, apiAppSecret, data, path) {
    const dateTime = new Date().toUTCString()
    const bodyStr = JSON.stringify(data)
    const md5 = crypto.createHash('md5').update(bodyStr, 'utf8').digest('hex')
    const contentMD5 = Buffer.from(md5).toString('base64')

    var headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Content-MD5': contentMD5,
        'Content-Length': Buffer.byteLength(bodyStr),
        'x-date': dateTime,
    }
    const sign = generateBKSign(apiAppKey, apiAppSecret, dateTime, 'POST', headers.Accept, headers['Content-Type'], path, contentMD5)
    headers.Authorization = sign
    return headers
}

export { generateBKHeader, http };

