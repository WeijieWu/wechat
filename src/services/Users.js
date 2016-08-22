import util from '../util';
const http = util.http;
module.exports.getUserAccessToken = function * (code) {
  var query = {
    appid: wechat.appid,
    secret: wechat.appsecret,
    code: code,
    grant_type: "authorization_code"
  };
  var res = yield http.get(userUrl, query);
  var body = res.body;
  body = JSON.parse(body) || {};
  var token = body.access_token;
  return token;
};

