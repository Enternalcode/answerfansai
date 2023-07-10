import qiniu from 'qiniu';
import { formatTimestamp } from '../utils/tool';

const accessKey = 'xWIPGRtig-B1ARQpFDKp-PLkrPVhOmOOqJ6ZPeTD';
const secretKey = 'Xa8uTbc6oPp1V_gYfWM5IBiMUtZtHlYns1ulWCN_';

async function getSign(req) {
  var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  var options = {
    scope: 'answerfansai',
  };
  var putPolicy = new qiniu.rs.PutPolicy(options);
  var uploadToken = putPolicy.uploadToken(mac);
  return {
    token: uploadToken
  };
}

function getToken(access_key, secret_key, bucketname) {
  // 构造策略
  var putPolicy = {
    "scope": bucketname,
    "deadline": 3600 + Math.floor(Date.now() / 1000)
  }
  var encoded = base64Encode(utf16to8(JSON.stringify(putPolicy)));
  var hash = CryptoJS.HmacSHA1(encoded, secret_key);
  // 构造凭证
  var encodedSign = hash.toString(CryptoJS.enc.Base64).replace(/\//g, '_').replace(/\+/g, '-');
  var uploadToken = access_key + ':' + encodedSign + ':' + encoded;
  return uploadToken;
}


async function getPrivateDownloadUrl(body) {
  var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  var config = new qiniu.conf.Config();
  var bucketManager = new qiniu.rs.BucketManager(mac, config);
  var privateBucketDomain = 'http://s.oralfairy.com';
  var deadline = parseInt(Date.now() / 1000) + 3600;
  var privateDownloadUrl = bucketManager.privateDownloadUrl(privateBucketDomain, body.key, deadline);
  return {
    url: privateDownloadUrl,
    expiraion: formatTimestamp(deadline)
  }
}


export { getPrivateDownloadUrl, getSign };

