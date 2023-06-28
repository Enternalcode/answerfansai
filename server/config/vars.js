const AV_CONFIG = {
    appId: "Mm4tx0gYeujdoGjQC8SpQSCQ-MdYXbMMI",
    appKey: "U9THm7naq02fTW2rsxwo0WjI",
    masterKey: "fEdsYjRnnSAcvGSQc0RMQAjT",
    serverURL: "https://lcserver.answerfansai.com"
}

const QINIU_CONFIG = {
    accessKey: "xWIPGRtig-B1ARQpFDKp-PLkrPVhOmOOqJ6ZPeTD",
    secretKey: "Xa8uTbc6oPp1V_gYfWM5IBiMUtZtHlYns1ulWCN_"
}

const SERVICE_CONFIG = {
    env: "prod", // dev, prod
    testServerURL: "http://106.53.97.149:9960",
    serverURL: "https://service-13p3cehs-1317931343.gz.apigw.tencentcs.com:443",
    apiAppKey: "APID5tCdS0MAi8Vp5Jc78743jI9smai1vi089NAV",
    apiAppSecret: "6uqqIiel0e1icnj52f1b96z91mz21gif6mbczfxt",
}

const YUNGOU = {
    mch_id: "100246935", // 商户ID
    YUNGOUOS_KEY: "6BA081D8B95F484F8860DCC2ECA8EEE5", // yungouos开发key
    notify_url: "https://2o757717i3.goho.co/api/pay/yungou", // 回调通知地址
    api_url: "https://api.pay.yungouos.com/api/pay/wxpay/nativePay",
    default_name: "AnswerFansAI member"
}



export { AV_CONFIG, QINIU_CONFIG, SERVICE_CONFIG, YUNGOU }
